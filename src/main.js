import { Picker } from './components/picker/picker';
import { ThreeScene } from './components/scene/scene';
import { IfcManager } from './components/ifc/ifc-manager';
import { Track } from './track';

const ifcModels = [];
const baseScene = new ThreeScene();
const picker = new Picker(baseScene, ifcModels);
const loader = new IfcManager(baseScene.scene, ifcModels);
const track = new Track(baseScene);


