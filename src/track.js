let video = null;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");
let manager = null;

let isVideo = false;
let model = null;
const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

let CommandActivationSteps = []
let CommandStatus = null;
let contextTracker = null;
export class Track {

    constructor(IFCManager) {

        video = document.getElementById("myvideo");
        contextTracker = this; 
        manager = IFCManager;   

        // Load the model.
        handTrack.load(modelParams).then(lmodel => {
            // detect objects in the image.
            model = lmodel
            updateNote.innerText = "Loaded Model!"
            trackButton.disabled = false
            trackButton.addEventListener("click", function () {
                if (!isVideo) {
                    updateNote.innerText = "Starting video"
                    trackButton.innerText = "Turn Off video"
                    contextTracker.startVideo(contextTracker);
                } else {
                    updateNote.innerText = "Stopping video"
                    trackButton.innerText = "Turn On video"
                    handTrack.stopVideo(video)
                    isVideo = false;
                    updateNote.innerText = "Video stopped"
                }
            });

            const input = document.getElementById("upload-model-input");
            input.addEventListener(
                "change",
                (changed) => {
                    console.log(changed);
                    manager.RefreshModel(changed);
                },
                false
            );
        });
    }

    startVideo(tracker) {
        handTrack.startVideo(video).then(function (status) {
            console.log("video started", status);
            if (status) {
                const howToBtn = '<button class="btn mt-1 w-100" data-toggle="modal" data-target="#how-to-modal">How to use it</button>';
                updateNote.innerHTML = howToBtn;
                isVideo = true
                tracker.runDetection(tracker)
            } else {
                updateNote.innerText = "Please enable video"
            }
        });
    }

    isNotHand(value) {
        return value.label != "face";
    }

    runDetection() {
        model.detect(video).then(predictions => {
            let pred = predictions.filter(contextTracker.isNotHand);
            model.renderPredictions(pred, canvas, context, video);
            if (pred[0] != null) {
                contextTracker.UpdateState(pred[0]);
                contextTracker.OrbitCamera(pred[0]);
            }
            if (isVideo) {
                window.requestAnimationFrame(contextTracker.runDetection);
            }
        });
    }

    UpdateState(prediction) {
        // Track point
        if (CommandActivationSteps.length == 0 && prediction.class == 4) {
            CommandActivationSteps.push(4);
            console.log("Waiting for command activation step 1");
        }
        //Track open
        if (CommandActivationSteps.length == 1 && CommandActivationSteps[0] == 4 && prediction.class == 1) {
            CommandActivationSteps.push(1);
            console.log("Waiting for command activation step 2");
        }
        if (CommandActivationSteps.length == 2
            && CommandActivationSteps[0] == 4
            && CommandActivationSteps[1] == 1
            && prediction.class == 2) {
            CommandActivationSteps.push(2);
            CommandStatus = 1;
            console.log("command activated");
        }
        if (CommandActivationSteps.length == 3 &&
            prediction.class == 1) {
            CommandActivationSteps = [];
            CommandStatus = 0;
            console.log("command deactivated");
        }
    }

    OrbitCamera(pred) {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let bbx = pred.bbox;
        let centerX = bbx[0];
        let centerY = bbx[1];
        //Lateral
        let lateralDirection = (centerX / 560) - 0.5;
        let VerticalDirection = (centerY / 300) - 0.5;
        let target = loader.controls.target;
        let LatRotSpeed = (lateralDirection * lateralDirection);
        let VerRotSpeed = (VerticalDirection * VerticalDirection);
        console.log(LatRotSpeed);
        var x = loader.camera.position.x,
            y = loader.camera.position.y,
            z = loader.camera.position.z;

        if (lateralDirection < 0) {
            loader.camera.position.x = x * Math.cos(LatRotSpeed) + z * Math.sin(LatRotSpeed);
            loader.camera.position.z = z * Math.cos(LatRotSpeed) - x * Math.sin(LatRotSpeed);
        } else {
            loader.camera.position.x = x * Math.cos(LatRotSpeed) - z * Math.sin(LatRotSpeed);
            loader.camera.position.z = z * Math.cos(LatRotSpeed) + x * Math.sin(LatRotSpeed);
        }

        if (VerticalDirection < 0) {
            loader.camera.position.y += VerRotSpeed;
        } else {
            loader.camera.position.y -= VerRotSpeed;
        }

        loader.camera.lookAt(target);

    }

}
