const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");

let isVideo = false;
let model = null;
let CommandActivationSteps = []

const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            updateNote.innerText = "Video started. Now tracking"
            isVideo = true
            runDetection()
        } else {
            updateNote.innerText = "Please enable video"
        }
    });
}

function toggleVideo() {
    if (!isVideo) {
        updateNote.innerText = "Starting video"
        startVideo();
    } else {
        updateNote.innerText = "Stopping video"
        handTrack.stopVideo(video)
        isVideo = false;
        updateNote.innerText = "Video stopped"
    }
}


function isNotHand(value) {
    return value.label != "face";
}



function runDetection() {
    model.detect(video).then(predictions => {
        pred = predictions.filter(isNotHand);

        model.renderPredictions(pred, canvas, context, video);
        if (pred[0] != null) {
            UpdateState(pred[0]);
            // console.log("Predictions: ", pred);
            // ChangeLocation(pred[0]);
        }
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
    updateNote.innerText = "Loaded Model!"
    trackButton.disabled = false
});


function UpdateState(prediction) {
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