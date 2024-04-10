/**
 * @author Roy Burgess
 * @date 18/07/2020
 * @version 1.0
 * @description Program to visualise the bubble sort algorithm.
 */

// Used in Node.js.
//const Sorter = require("./sorter");

let w;
let sorter;
let bSorter;
let t0;
let t1;
let paddingWidth = 60;
let paddingHeight = 270;
let done = false;
let buffer;
let button;
let pause = true;

/**
 * @description Main setup function to initalise the canvas, buffer, and Sorter object.
 */
function setup() {
    var cnv = createCanvas(windowWidth - paddingWidth, windowHeight - paddingHeight);
    // Set the canvas to be displayed in a div with id="scetch".
    cnv.parent("sketch");
    
    buffer = createGraphics(width, height);

    buffer.background(0);
    buffer.noStroke();

    sorter = new Sorter();
    sorter.generateNumbers(30,height);

    w = (width) / sorter.a.length;

    frameRate(60);
    
    drawBars();
    bSorter = sorter.selectionSort();

    inpLabel = createElement('p','Number of items to sort');
    inpLabel.parent("sketch");

    // Create a button to control to allow the user to start and pause the program.
    button = createButton("Start", "btn1");
    button.class('w3-button w3-round w3-ripple w3-theme');
    button.mousePressed(btnPressed);
    button.parent("sketch");

    inp = createInput('30');
    inp.parent("sketch");
    inp.class('w3-input w3-round w3-border w3-light-grey w3-margin-left');
    inp.style('width:10%; display:inline-block');
    inp.attribute('type','number');
    inp.input(inputChanged);

    noLoop();
}

/**
 * @description Listner function to detect when the input text has changed.
 */
function inputChanged() {
    done=true;
}
/**
 * @description Listner function for a button press.
 */
function btnPressed() {
    // Check input is valid
    if(inp.value() == "") {
        alert("Please input a number!");
    }
    else {
        if(!done) {
            if(!pause) {
                button.html("Resume");
                noLoop();
                pause = true;
            }
            else {
                button.html("Pause");
                loop();
                t0 = performance.now();
                pause = false;
            }
        }
        else {
            done = false;
            pause = false;
            sorter.generateNumbers(parseInt(inp.value()),height);
            bSorter = sorter.selectionSort();
            button.html("Pause");
            w = (width) / sorter.a.length;
            t0 = performance.now();
            loop();
        }
    }
}

/**
 * @description The main loop for the program.  Initiates and updates the drawing of the sorter visualisation.
 */
function draw() {
    buffer.background(0);
    drawBars();
    if(bSorter.next().done) {
        if(!done) {
            t1 = round(performance.now() - t0) / 1000;
            print("Done!");
            print(`Bubble sorted ${sorter.a.length} items in ${t1} seconds.`);
            done = true;
            button.html("Start");
        }
        buffer.textSize(width / 30);
        buffer.fill(0,0,255);
        buffer.text(`Sorted ${sorter.a.length} items in ${t1} seconds.`,(width/2)/2,height/2);
        noLoop();
    }
    image(buffer, 0, 0);
}

/**
 * @description Listner function that resizes the canvas when the window is resized.
 */
function windowResized() {
    resizeCanvas(windowWidth - paddingWidth, windowHeight - paddingHeight);
    w = (width) / sorter.a.length;
    buffer = createGraphics(width, height);

    // Change the width of the input if the window size changes
    if(windowWidth > 548) {
        inp.style('width:10%; display:inline-block');
        algoImg.style.width = 'width:60%';
    }
    else {
        inp.style('width:20%; display:inline-block');
        algoImg.style.width = 'width:100%';
    }
  }

/**
 * @description Funtion to draw the bars representing the random numbers.
 */
function drawBars() {
    buffer.fill(255, 0, 0);
    let x= 0;
    let red = false;

    sorter.a.forEach((value, index) => {
        buffer.rect(x, height - value, w, value);
        //rect(x, (height - value)/2, w, value);
        x += w;
        if(red) {
            buffer.fill(255, 0, 0);
            red = false;
        } else {
            buffer.fill(0, 255, 0);
            red = true;
        }
    });
}