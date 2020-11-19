/**
 * @author Roy Burgess
 * @date 19/11/2020
 * @version 1.2
 * @description A program to visualise the Depth First Search algorithm in the form of 
 * maze generation and solving.
 */

let searcher;
let cellSize = 20;
let halfCellSize = cellSize / 2;
let quarterCellSize = halfCellSize / 2;
let canvasDimensions = [1400, 520];
let generated = false;
let toFind;
let drawMouseOver = false;
let paddingWidth = 60;
let paddingHeight = 270;

/**
 * @description Displays the cell walls and coloured squares inside marked cells
 * to indicate start, end, path, and mouse hover.
 */
function drawCells() {
    buffer.background(51);

    // Draw the path cells
    if(searcher.path.length > 0) {
        buffer.fill(color(0,180,180));
        buffer.noStroke();
        for(let p of searcher.path) {
            buffer.square(p.x + quarterCellSize,p.y + quarterCellSize,cellSize - halfCellSize);
        }
    }

    if(typeof searcher.toFind != 'undefined') {
        // Draw cell to find
        buffer.fill(color(255,0,0));
        buffer.noStroke();
        buffer.square(searcher.cells[searcher.toFind].x + quarterCellSize,searcher.cells[searcher.toFind].y + quarterCellSize,cellSize - halfCellSize);
    }

    // Draw mouse over cell
    if(drawMouseOver) {
        let xValue = mouseX - (mouseX % cellSize);
        let yValue = mouseY - (mouseY % cellSize);

        buffer.fill(color(0,255,0));
        buffer.square(xValue + quarterCellSize, yValue + quarterCellSize, cellSize - halfCellSize);
    }

    // Draw the cell walls
    buffer.stroke(color(0, 128, 200));
  
    for(let cell of searcher.cells) {
        cell.display(buffer, cellSize);
    }

    buffer.fill(color(255,255,255));
    buffer.square(searcher.cells[searcher.currentCell].x + quarterCellSize,searcher.cells[searcher.currentCell].y + quarterCellSize,cellSize - halfCellSize);
    
    image(buffer, 0, 0);
}

/**
 * @description Listner function for mouseMoved event.  Enables the user to see which cell is to be selected
 * by displaying a coloured square in the cell which is nearist the mouse pointer.
 */
function selectCell() {
    if(generated) {
        drawMouseOver = true;
        drawCells();
    }
}

/**
 * @description Listner function for mousePressed event.  Enables the user to set a location 
 * in the maze to be found by the Searcher.
 */
function setToFind() {
    let xValue = mouseX - (mouseX % cellSize);
    let yValue = mouseY - (mouseY % cellSize);

    for(let i = 0; i < searcher.cells.length; i++) {
        if(searcher.cells[i].x == xValue && searcher.cells[i].y == yValue) {
            searcher.toFind = i;
            searcher.path = [];
            loop();
        }
    }
}

/**
 * @description Function to reset Searcher object values ready for next search.
 */
function reset() {
    searcher.resetVisited();
    // Push start cell number to stack
    searcher.currentCell = 0;
    searcher.stack.push(searcher.currentCell);
    searcher.cells[searcher.currentCell].visited = true;
    searcher.found = false;
}

/**
 * @description Function to set canvas dimensions and cell size depending on window size.
 */
function setCanvasDimensions() {
    canvasDimensions[0] = (windowWidth - 32)-((windowWidth - 32) % cellSize) - 20;
    if(canvasDimensions[0] > 400) {
        cellSize = 40;
    } else {
        cellSize = 20;
    }
}

/**
 * @description Setup function for the Searcher object.
 */
function setupSearcher() {
    // Cells setup
    let i = 0;
    for (let y = 0; y < height; y += cellSize) {
        
        for (let x = 0; x < width; x += cellSize) {
            //drawCell(x, y, cellSize, w[i]);
            searcher.cells[i] = new Cell(x, y, 4);
            i++;
        }
    }

    // Push start cell number to stack
    searcher.currentCell = 0;
    searcher.stack.push(searcher.currentCell);
    searcher.cells[searcher.currentCell].visited = true;
}

/**
 * @description Main setup function to initalise the canvas, buffer, and Searcher object.
 */
function setup() {
    setCanvasDimensions();
    var cnv = createCanvas(canvasDimensions[0], canvasDimensions[1]);
    //var cnv = createCanvas(windowWidth - paddingWidth, windowHeight);
    // Set the canvas to be displayed in a div with id="scetch".
    cnv.parent("sketch");
    
    // Mouse listeners
    cnv.mouseMoved(selectCell);
    cnv.mousePressed(setToFind);

    // Create a buffer with the dimensions of the canvas.
    buffer = createGraphics(width, height);

    frameRate(60);

    searcher = new Searcher();
    setupSearcher();
}

/**
 * @description Listner function that resizes the canvas when the window is resized.
 */
function windowResized() {
    setCanvasDimensions();
    //resizeCanvas(windowWidth - paddingWidth, windowHeight - paddingHeight);
    resizeCanvas(canvasDimensions[0], canvasDimensions[1]);
    
    buffer = createGraphics(width, height);
    generated = false;
    searcher = new Searcher();
    setupSearcher();
    //draw();
    loop();
}

/**
 * @description The main loop for the program.  Initiates drawing of the maze and maze generation or
 * if a maze is generated, calls the DFS to solve the maze.
 */
function draw() {
    if(!generated) {
        // Generate maze
        if(searcher.dfs(generated)) {
            drawCells();
        } else {
            generated = true;
            // Set random cell in maze to find
            searcher.toFind = searcher.currentCell;
            while(searcher.toFind == searcher.currentCell) {
                searcher.toFind = int(random(searcher.cells.length));
            }
            
            reset();

            drawCells();
            noLoop();
        }
    } else {
        // Solve maze
        if(searcher.dfs(generated)) {
            drawCells();
        } else {
            drawCells();
            reset();
            noLoop();
        }
    }
}