import { Picker } from './components/picker/picker';
import { ThreeScene } from './components/scene/scene';
import { IfcManager } from './components/ifc/ifc-manager';
import { Track } from './track';
import input from './components/svelte/everseComponents/input.svelte'
import HomeModal from './components/svelte/HomeModal.svelte'
import InfoModal from './components/svelte/InfoModal.svelte'

const ifcModels = [];
const ifcFilePath = "";
const baseScene = new ThreeScene();
const picker = new Picker(baseScene, ifcModels);
const loader = new IfcManager(baseScene.scene, ifcModels, ifcFilePath);
const track = new Track(loader, baseScene);

window.track = track

window.input = function (options) {
  return new input(options);
};

window.HomeModal = function (options) {
  return new HomeModal(options)
}
window.InfoModal = function (options) {
  return new InfoModal(options)
}
