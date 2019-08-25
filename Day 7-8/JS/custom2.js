var labelCounter = 0;
var clocks = [];
var start, stop;

class MyCLock {
    constructor(timerCounter, second) {
        this.timerCounter = timerCounter;
        this.second = second;
        this.initialSecond = 30;
        this.status = "ready";
        this.interval = 0;
        document.getElementsByClassName("seconds")[this.timerCounter].style = "transform:rotate(" + setPositionSecondHand(this.second) + "deg)";
        const labelField = document.getElementsByTagName("label")[labelCounter];
        labelField.innerText = labelCounter;
        labelField.parentElement.lastElementChild.firstElementChild.value = this.second;
        labelCounter = labelCounter + 1;
    }

    start() {
        console.log("Start:" + this.timerCounter);
    }

    stop() {
        this.second = this.initialSecond;
        clearInterval(this.interval);
        this.clockStatus("stop");
        document.getElementsByClassName("seconds")[this.timerCounter].style = "transform:rotate(" + setPositionSecondHand(this.initialSecond) + "deg)";
        document.getElementsByClassName("startBtn")[this.timerCounter].innerText = "Start";
        console.log('After Stop Watch:', this);
    }

    pause() {
        clearInterval(this.interval);
    }

    move() {
        this.clockStatus("moving");
        console.log("timerCounter:" + this.timerCounter + ":" + this.second + ":" + setPositionSecondHand(this.second));
        document.getElementsByClassName("seconds")[this.timerCounter].style = "transform:rotate(" + setPositionSecondHand(this.second) + "deg)";
        if (this.second < 11) {
            document.getElementsByClassName("seconds")[this.timerCounter].style.background = "#ff4136";
        }
    }

    clockStatus(status) {
        this.status = status;
    }
}

function startClock(event) {

    console.log(event);
    let timerCounter = event.getAttribute("data-attribute");

    var buttonDisplay = event;

    let clock = clocks[timerCounter];

    console.log('clock: ', clock);

    if (clock.second > 0 && buttonDisplay.innerText == "Start") {
        buttonDisplay.innerText = "Pause";

        clock.interval = setInterval(function() {
            if (clock.second <= 0) {
                clock.stop();
                return;
            } else {
                clock.second = clock.second - 1;
                clock.move();
            }
        }, 1000);

    } else {
        this.status = "pause";
        buttonDisplay.innerText = "Start";
        clock.pause();
    }
}

function stopClock(event) {
    console.log("Stop: " + event);
    let timerCounter = event.getAttribute("data-attribute");

    let clock = clocks[timerCounter];
    clock.stop();
}

function addWatch(event) {
    let startButton = 0;
    let stopButton = 0;

    if (labelCounter > 0) {
        let watchContainer = document.getElementsByClassName("container")[0];
        let cln = watchContainer.cloneNode(true);
        const bodyElement = document.getElementsByTagName("body")[0];
        bodyElement.appendChild(cln);
        startButton = bodyElement.lastElementChild.lastElementChild.getElementsByClassName('startBtn')[0];
        startButton.innerText = "Start";
        stopButton = bodyElement.lastElementChild.lastElementChild.getElementsByClassName('stopBtn')[0];
    } else {
        startButton = document.getElementsByClassName("startBtn")[0];
        stopButton = document.getElementsByClassName("stopBtn")[0];
    }

    startButton.setAttribute("data-attribute", labelCounter);
    stopButton.setAttribute("data-attribute", labelCounter);

    clock = new MyCLock(labelCounter, "30");
    clocks.push(clock);
    console.log('clocks: ', clocks);

    document.getElementsByClassName("container")[0].style.display = "block";
}

function setPositionSecondHand(secondHand) {
    return secondHand * 360 / 60;
}