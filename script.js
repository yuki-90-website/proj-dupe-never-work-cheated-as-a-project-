img = "";
objects = [];
status = "";

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "STATUS: DETECTING OBJECTS";
}

function modelLoaded() {
    console.log("cocossd is loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log("Error!");
    }
    objects = results;
}

function draw() {
    image(img, 0, 0, 640, 420);

    if (statusnostrike != "") {
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "STATUS: OBJECT DETECTED";
            fill("lightgray");
            percent = flooor(objects[i].confidence * 100);

            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("darkcyan");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}