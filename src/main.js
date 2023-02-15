import { Picker } from './components/picker/picker';
import { ThreeScene } from './components/scene/scene';
import { IfcManager } from './components/ifc/ifc-manager';
import { Track } from './track';
import testComponent from './components/svelte/testComponent.svelte'

const ifcModels = [];
const ifcFilePath = "";
const baseScene = new ThreeScene();
const picker = new Picker(baseScene, ifcModels);
const loader = new IfcManager(baseScene.scene, ifcModels, ifcFilePath);
const track = new Track(loader, baseScene);

window.MyComponent = function (options) {
  return new testComponent(options);
};
