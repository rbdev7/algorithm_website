/**
 * @author Roy Burgess
 * @date 29/10/2020
 * @version 1.0
 * @description A cell class to hold data relating to a cell on a grid.
 */
class Cell {
    /**
     * @description Constructor for the Cell class.
     * @param {Integer} x The x co-odinate of the cell.
     * @param {Integer} y The y co-odinate of the cell.
     * @param {Integer} numWalls The number of walls the cell has.
     */
    constructor(x, y, numWalls) {
        this.x = x;
        this.y = y;
        this.visited = false;
        this.walls = [];
        for(let i = 0; i < numWalls; i++) {
            this.walls[i] = true;
        }
    }

    /**
     * Displays the cell walls.
     * @param {Renderer Object} buffer 
     * @param {Integer} cellSize 
     */
    display(buffer, cellSize) {
        // Top
        if (this.walls[0] == true) {
            buffer.line(this.x, this.y, this.x + cellSize, this.y);
        }
        // Right
        if (this.walls[1] == true) {
            buffer.line(this.x + cellSize, this.y, this.x + cellSize, this.y + cellSize);
        }
        // Bottom
        if (this.walls[2] == true) {
            buffer.line(this.x, this.y + cellSize, this.x + cellSize, this.y + cellSize);
        }
        // Left
        if (this.walls[3] == true) {
            buffer.line(this.x, this.y, this.x, this.y + cellSize);
        }
    }
}

//module.exports = Cell;