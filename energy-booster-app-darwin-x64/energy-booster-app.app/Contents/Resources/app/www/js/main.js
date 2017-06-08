/*_______________________________________________

Energy Boost

description: A Javascript exercise timer

author: Aina Rønningen
license: Attribution 4.0 International (CC BY 4.0)

________________________________________________*/


// Global vars
var program = JSON.parse(programString);

var programCounter = 0;
var durationWork   = program[programCounter].duration;
var intervalObject;

// fetch ui elements
var clockObject      = document.querySelector("#clock");
var timeTextObject   = document.querySelector(".duration p");
var startButton      = document.querySelector(".start-button");
var stopButton       = document.querySelector(".stop-button");
var timerObject      = document.querySelector(".timer");
var clockTimerObject = document.querySelector(".clock-timer");
var headerObject = document.querySelector(".header");
var downloadButton = document.querySelector(".download");

// add event listener to the start-button and stop-button
startButton.addEventListener("click", handleStartButtonClick);
stopButton.addEventListener("click", handleStopButtonClick);


function handleStartButtonClick(event) {

    // make the start-button and download-button invisible and stop-button visible
    clockObject.classList.toggle("hidden");
    timerObject.classList.toggle("hidden");
    startButton.classList.toggle("hidden");
    stopButton.classList.toggle("hidden");
    downloadButton.classList.toggle("hidden");
    showDuration();

    // start interval timer
    intervalObject = setInterval(handleInterval, 1000);

    function handleInterval() {
        
        
        if (durationWork.min == 0 && durationWork.sec == 0) {
            
            if (programCounter == program.length - 1) {

                // the program is done
                clearInterval(intervalObject);
                clockObject.classList.toggle("hidden");
                timerObject.classList.toggle("hidden");
                startButton.classList.toggle("hidden");
                stopButton.classList.toggle("hidden");
                headerObject.classList.add("hidden");
                downloadButton.classList.toggle("hidden");
                document.body.style.backgroundColor = "#EFEEEA";
                console.log('program is done');
                
            } else {

                // move to the next interval in the program
                programCounter++;

                var programObject = program[programCounter];
                durationWork = programObject.duration;

                showDuration();
            }

        } else {
            countDown();
            showDuration();
            
            if (durationWork.min == 0 && durationWork.sec == 4) {
                
                if(programCounter+1 < program.length){
                    
                    if(program[programCounter+1].title == 'work'){
                        var myAudio = document.querySelector("#countdown");
                        myAudio.play(); 
                    }

                    if(program[programCounter+1].title == 'rest'){
                        var myAudio = document.querySelector("#countdown2");
                        myAudio.play(); 
                    }
                }
            }
        }
    };
}

function handleStopButtonClick(event) {
        
    clearInterval(intervalObject);
    programCounter = 0;
    program = JSON.parse(programString);
    durationWork = program[programCounter].duration;
    
    var titleHeader   = document.getElementsByTagName('h1')[0];
    titleHeader.innerHTML = "Start over";
    document.body.style.backgroundColor = "#EFEEEA";
    
    var pieces = document.querySelectorAll('#clock g');
    
    for(var i = 0; i < pieces.length; i++){
        
        var plane = pieces[i].querySelectorAll('use')[1];
        plane.setAttribute('fill', '#EFEEEA');
    }
    
    clockObject.classList.toggle("hidden");
    timerObject.classList.toggle("hidden");
    startButton.classList.toggle("hidden");
    stopButton.classList.toggle("hidden");
    downloadButton.classList.toggle("hidden");
}

// decrease the duration by 1 sec
function countDown() {

    durationWork.sec = durationWork.sec - 1;

    if (durationWork.sec < 0) {
        durationWork.min = durationWork.min - 1;
        durationWork.sec = 59;
    }
}

// Show the remaining duration
function showDuration() {

    var min = durationWork.min;
    var sec = durationWork.sec;
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    timeTextObject.textContent = min + ":" + sec;
    
    var programObject = program[programCounter];
    var titleHeader   = document.getElementsByTagName('h1')[0];
    
    // change header to prepare
    if (programObject.title == "prepare") {
        titleHeader.innerHTML = "Prepare";
        document.body.style.backgroundColor = "#FFE317";
        downloadButton.classList.add("hidden");
    }

    // insert yellow tiles
    if (programObject.title == "rest") {
        var piece = document.querySelector('#piece' + programObject.round);
        var plane = piece.querySelectorAll('use')[1];
        plane.setAttribute('fill', '#FFE317');

        // change header to rest
        titleHeader.innerHTML = "Rest";
        document.body.style.backgroundColor = "#FF686C";
        downloadButton.classList.add("hidden");
    }

    // change header to work
    if (programObject.title == "work") {
        titleHeader.innerHTML = "Work";
        document.body.style.backgroundColor = "#89E16B";
        downloadButton.classList.add("hidden");
    }
}
