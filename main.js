img = "";
status = "";
alarm = "";
object = []

function preload() {
    alarm = loadSound('warning.mp3');
}

function setup() {
    canvas = createCanvas(550, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status:  Detecting Baby";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 550, 400);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
        }
    }
    if(object == person)
    {
        document.getElementById("status").innerHTML = "Status: Baby Detected";
        alarm.stop();
    }
     else
    {
        document.getElementById("status").innerHTML =  "Status: Baby Not Detected";
        alarm.play();
    }
    if(object  < 0)
    {
        document.getElementById("status").innerHTML = "Status: Baby Not Detected";
        alarm.play();
    }
