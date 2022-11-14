let length = 20;
let angle = 50;

let saveFps = 0;

let secondsAtTick = 0.002;
let secondsAfterStart = 0;

let isStart = false;
let isEnd = true;


let isMove = false;
let moveStartX = 0;
let moveStartY = 0;

const CLEAR = 255;
var x = 60;
var y = 100;
function setup() {
    angleMode(DEGREES);
    var canvas = createCanvas(500, 500);
    canvas.parent('view');
    stroke(20);
    frameRate(60);
    canvas.mousePressed(startMove);
    canvas.mouseReleased(stopMove);
    canvas.mouseOut(stopMove);

}

function draw() {
    background(CLEAR);
    trackBall();
    if (isMove && !document.getElementById("IsTrack").checked) {
        x += int(mouseX - moveStartX);
        y += int(mouseY - moveStartY);
        moveStartX = mouseX;
        moveStartY = mouseY;
    }
    draw_stand();
    push();
    translate(x, y);
    rotate(90 - angle);
    draw_ball(get_position(secondsAfterStart));
    draw_line();
    pop();
    draw_timer();

    if (isStart) {
        secondsAfterStart = frameCount * secondsAtTick
        draw_checker();
    }


}
function keyReleased() {
    if (document.getElementById("angleInput").value) {
        if (float(document.getElementById("angleInput").value) < 91) {
            if (float(document.getElementById("angleInput").value) > -1) {
                angle = float(document.getElementById("angleInput").value);
            }
        }
    }
    if (document.getElementById("lengthInput").value) {
        if (document.getElementById("lengthInput").value > 0) {
            length = document.getElementById("lengthInput").value;
        }
    }
    if (document.getElementById("tickPerSecondInput").value) {
        setFrameRate(int(document.getElementById("tickPerSecondInput").value));
    }
    if (document.getElementById("SecondInTickInput").value) {
        secondsAtTick = float(document.getElementById("SecondInTickInput").value)
    }

}

function draw_ball(position) {
    fill(CLEAR)
    stroke(20)
    if (document.getElementById("is_dot").checked) {
        circle(position, -8, 10);
    } else {
        square(position - 5, -12, 10)
    }
}

function draw_line() {
    noFill();
    stroke(20)
    strokeWeight(4);
    rect(0, 0, length * 20, 40);
    strokeWeight(2);
    for (let i = 0; i < length; i++) {
        line(20 * i, 0, 20 * i, 20 - ((i % 2) * 5));
    }
    if (length < 5) {
        line(20 * length, 40, 100, 40)
    }

    stroke('rgb(255,0,0)')
    line(20 * length, -10, 20 * length, -20)

    stroke(20)
    arc(0, 40, 200, 200, 0, angle);
    stroke(CLEAR)
    fill(20);
    textSize(20);
    text(angle + String.fromCharCode(176), 120, 70);
    noFill();
    stroke(20);
}
function draw_stand() {
    noStroke();
    fill(20);
    rect(0, y, x, 500 - y, 0, 0, 0, 10);
    noFill();
}

function get_position(secounds) {
    return (sin(90 - angle) * (9.8 * 100 * 20)) * secounds * secounds / 2
}

function start() {
    frameCount = 0;
    secondsAfterStart = 0;
    isStart = true;
    isEnd = false;
}
function doPause() {
    if (!isEnd) {
        if (isStart) {
            saveFps = frameCount;
            isStart = false;
        } else {
            frameCount = saveFps;
            isStart = true;
        }
    }
}
function stop() {
    frameCount = 0;
    secondsAfterStart = 0;
    isStart = false;
}
function draw_timer() {
    stroke(CLEAR)
    fill(20);
    strokeWeight(3);
    textSize(20);
    text("прошло: " + int(secondsAfterStart * 1000) / 1000 + "c", 300, 400);
    noFill();
    stroke(20);

}
function draw_checker() {
    if (sqrt(2 * (length * 20) / (sin(90 - angle) * (9.8 * (20 * 100)))) < secondsAfterStart && document.getElementById("AutoStop").checked) {
        isStart = false;
        isEnd = true;
        secondsAfterStart = sqrt(2 * (length * 20) / (sin(90 - angle) * (9.8 * (20 * 100))));
    }
}

function startMove() {
    isMove = true;
    isEnd = false
    moveStartX = mouseX;
    moveStartY = mouseY;
}
function stopMove() {
    isMove = false;
    isEnd = true;

}
function trackBall(){
    if (document.getElementById("IsTrack").checked){
        x = sin(angle) * -get_position(secondsAfterStart) + 250;
        y = cos(angle) * -get_position(secondsAfterStart) + 250;
        console.log(1)
    }
}