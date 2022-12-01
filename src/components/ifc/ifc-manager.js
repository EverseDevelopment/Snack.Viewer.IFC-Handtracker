import { Matrix4 } from 'three';
import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';
import { IFCWALLSTANDARDCASE, IFCSLAB, IFCWINDOW, IFCSPACE, IFCOPENINGELEMENT } from 'web-ifc';

export class IfcManager {
    constructor(scene, ifcModels, ifcFilePath) {
        this.scene = scene;
        this.ifcModels = ifcModels;
        this.modelScale = 0.2;
        this.ifcLoader = new IFCLoader();
        this.setupIfcLoader();
        this.setupFileOpener(ifcFilePath);
    }

    remove = false;

    async editSubset(type) {
        const ids = await this.ifcLoader.ifcManager.getAllItemsOfType(0, type, false);
        if (this.remove) this.ifcLoader.ifcManager.removeFromSubset(0, ids);
        else this.ifcLoader.ifcManager.createSubset({ modelID: 0, ids, applyBVH: false, removePrevious: false })
    }

    setupThreeMeshBVH() {
        this.ifcLoader.ifcManager.setupThreeMeshBVH(
            computeBoundsTree,
            disposeBoundsTree,
            acceleratedRaycast
        );
    }

    async setupIfcLoader() {

        await this.ifcLoader.ifcManager.parser.setupOptionalCategories({
            [IFCSPACE]: false,
            [IFCOPENINGELEMENT]: false
        });

        await this.ifcLoader.ifcManager.useWebWorkers(true, './IFCWorker.js');
        this.setupThreeMeshBVH();
    }

    setupFileOpener(ifcFilePath) {
        setTimeout(async () => {
            await this.loadIFC(ifcFilePath);
        }, 50);
    }

    async dispose() {
        this.ifcModels.length = 0;
        await this.ifcLoader.ifcManager.dispose();
        this.ifcLoader = null;
        this.ifcLoader = new IFCLoader();
        await this.setupIfcLoader();
    }

    subset = {};

    async loadIFC(ifcFilePath) {

        if (ifcFilePath == "" || ifcFilePath == null) {
            ifcFilePath = "../../../model/defaultModel.ifc";
        }

        console.log(ifcFilePath);

        const start = window.performance.now()
        this.ifcLoader.ifcManager.setOnProgress((event) => console.log(event));

        const firstModel = true; 

        await this.ifcLoader.ifcManager.applyWebIfcConfig({
            COORDINATE_TO_ORIGIN: firstModel,
            USE_FAST_BOOLS: false
        });

        const ifcModel = await this.ifcLoader.loadAsync(ifcFilePath);
        if (firstModel) {
            const matrixArr = await this.ifcLoader.ifcManager.ifcAPI.GetCoordinationMatrix(ifcModel.modelID);
            const matrix = new Matrix4().fromArray(matrixArr);
            this.ifcLoader.ifcManager.setupCoordinationMatrix(matrix);
        }

        this.ifcModels.push(ifcModel);
        ifcModel.scale.set(this.modelScale, this.modelScale, this.modelScale);
        const modelBoundingBox = ifcModel.geometry.boundingBox;
        ifcModel.position.set(0, -modelBoundingBox.min.y * this.modelScale, 0);
        this.scene.add(ifcModel);

        const stop = window.performance.now()

        console.log(`Time Taken to load = ${(stop - start) / 1000} seconds`);
    }

    async RefreshModel(changed) {

        const file = changed.target.files[0];
        var ifcURL = URL.createObjectURL(file);

        const ifcFilePath = ifcURL;

        const scene = this.scene;

        var count = scene.children.length;        

        if (scene) {            
            //Remove the previous 3D model
            scene.remove(scene.children[count - 1]);
        }

        //Add a new 3D model
        this.loadIFC(ifcFilePath);

        console.log(file)
    }
}