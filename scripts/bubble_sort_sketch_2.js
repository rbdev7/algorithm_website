let a = [];
let w;
let h;
let sorter;
let t0;
let t1;
let paddingWidth = 60;
let paddingHeight = 200;
let done = false;
let buffer;
let button;
let pause = true;

function setup() {
    //var cnv = createCanvas(1000, 500);
    var cnv = createCanvas(windowWidth - paddingWidth, windowHeight - paddingHeight);
    // Set the canvas to be displayed in a div with id="scetch".
    cnv.parent("sketch");
    
    buffer = createGraphics(width, height);

    buffer.background(0);
    buffer.noStroke();
    generateNumbers(30);
    w = (width) / a.length;
    //w = Math.floor((windowWidth) / a.length);
    h = height;

    frameRate(60);
    
    drawBars();
    sorter = bubbleSort();

    inpLabel = createElement('p','Number of items to sort');
    inpLabel.parent("sketch");

    // Create a button to control to allow the user to start and pause the program.
    button = createButton("Start", "btn1");
    //button.position(30,height + 20);
    button.class('w3-button w3-round w3-ripple w3-theme');
    button.mousePressed(btnPressed);
    button.parent("sketch");

    inp = createInput('30');
    inp.parent("sketch");
    inp.class('w3-input w3-round w3-border w3-light-grey w3-margin-left');
    inp.style('width:10%; display:inline-block');
    inp.attribute('type','number');
    inp.input(inputChanged);
    //inp.position(button.x + button.width,button.y);

    noLoop();
}

function inputChanged() {
    done=true;
}

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
            generateNumbers(parseInt(inp.value()));
            sorter = bubbleSort();
            button.html("Pause");
            w = (width) / a.length;
            t0 = performance.now();
            loop();
        }
    }
}

function draw() {
    buffer.background(0);
    drawBars();
    if(sorter.next().done) {
        if(!done) {
            t1 = round(performance.now() - t0) / 1000;
            print("Done!");
            print(`Bubble sorted ${a.length} items in ${t1} seconds.`);
            done = true;
            button.html("Start");
        }
        buffer.textSize(width / 30);
        buffer.fill(0,0,255);
        buffer.text(`Sorted ${a.length} items in ${t1} seconds.`,(width/2)/2,height/2);
        noLoop();
    }
    image(buffer, 0, 0);
}

function windowResized() {
    resizeCanvas(windowWidth - paddingWidth, windowHeight - paddingHeight);
    w = (width) / a.length;
    h = height;
    buffer = createGraphics(width, height);

    // Change the width of the input if the window size changes
    if(windowWidth > 548) {
        inp.style('width:10%; display:inline-block');
    }
    else {
        inp.style('width:20%; display:inline-block');
    }
  }

/**
 * Function to generate an array of random numbers.
 * 
 * @param {Integer} num Number of random numbers to generate.
 */
function generateNumbers(num) {
    a = [];
    for(let i=0; i < num; i++) {
        a[i] = Math.floor(Math.random() * height);
    }
}

/**
 * Funtion to draw the bars representing the random numbers.
 */
function drawBars() {
    buffer.fill(255, 0, 0);
    let x= 0;
    let red = false;

    a.forEach((value, index) => {
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

/**
 * Implementation of the bubble sort algorithm.
 * This function is a generator function.  This allows the function to be
 * stopped (using 'yield') part way through execution and resumed (using 'next()').
 */
function* bubbleSort() {
    let swapped=true;
    while(swapped) {
        swapped = false;
        for(let i = 0; i < a.length - 1; i++) {
            if (a[i] > a[i + 1]) {
                // swap
                let t = a[i];
                a[i] = a[i + 1];
                a[i + 1] = t;
                swapped = true
            }
            yield;
        }
    }
    
}