let video = null;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");
let loader = null;

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


    constructor(IFCloader) {

        video = document.getElementById("myvideo");
        contextTracker = this;
        loader = IFCloader;
        // Load the model.
        handTrack.load(modelParams).then(lmodel => {
            // detect objects in the image.
            model = lmodel
            updateNote.innerText = "Loaded Model!"
            trackButton.disabled = false
            trackButton.addEventListener("click", function () {
                if (!isVideo) {
                    updateNote.innerText = "Starting video"
                    contextTracker.startVideo(contextTracker);
                } else {
                    updateNote.innerText = "Stopping video"
                    handTrack.stopVideo(video)
                    isVideo = false;
                    updateNote.innerText = "Video stopped"
                }
            });
        });
    }



    startVideo(tracker) {
        handTrack.startVideo(video).then(function (status) {
            console.log("video started", status);
            if (status) {
                updateNote.innerText = "Video started. Now tracking"
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
                // console.log("Predictions: ", pred);
                contextTracker.ChangeLocation(pred[0]);
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
    ChangeLocation(pred) {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let bbx = pred.bbox;
        let x = bbx[0] / width - 0.5;
        let y = (bbx[1] / height - 0.5);
        loader.camera.position.x = Math.sin(x * Math.PI * 2) * 3;
        loader.camera.position.z = Math.sin(y * Math.PI * 2) * 3;
        console.log(bbx);
        // console.log(loader);
    }

}
