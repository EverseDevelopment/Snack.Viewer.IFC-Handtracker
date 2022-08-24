import { MeshLambertMaterial } from 'three';
import { RayCaster } from './raycaster';
import { ItemSelector } from './item-selector';

export class Picker {
    constructor(base, ifcModels) {
        this.pickMat = this.newMaterial(0.5, 0xff00ff);
        this.prePickMat = this.newMaterial(0.5, 0xffccff);
        this.caster = new RayCaster(base.camera, ifcModels);
        this.selector = new ItemSelector(base.scene, ifcModels, this.caster, this.pickMat);
        this.setupPicking(base.threeCanvas);
    }

    dispose() {
        this.selector.dispose();
        this.preSelector.dispose();
    }

    setupPicking(threeCanvas){
        threeCanvas.ondblclick = (event) => this.selector.select(event, false, true);
    }

    newMaterial(opacity, color){
        return new MeshLambertMaterial({
            color,
            transparent: true,
            opacity,
            depthTest: false
        })
    }
}