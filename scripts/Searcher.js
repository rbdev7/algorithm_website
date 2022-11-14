/**
 * @author Roy Burgess
 * @date 03/11/2020
 * @version 1.0
 * @class
 * @classdesc Searcher class to execute search algorithms on an array of Cell objects.
 */
class Searcher {
    constructor() {
        this.stack = [];
        this.cells = [];
        this.currentCell;
        this.found = false;
        this.toFind;
        this.path = [];
    }

    /**
     * @description Function to find unvisited neighbour cells and if generating a maze,
     * select a random cell to visit.
     * @param {Integer} cellNo 
     * @param {Boolean} withWalls 
     */
    findUnvisitedNeighbours(cellNo, withWalls) {
        let found = [];
        if(cellNo >= 0 && cellNo <= this.cells.length) {
            let stride = Math.round(width/cellSize);
            if(!withWalls) {
                if(cellNo > stride - 1) {
                    // top
                    if(!this.cells[cellNo - stride].visited) {
                        found.push(0);
                    }
                }
        
                if(cellNo < this.cells.length -1 && (cellNo % stride) < (stride - 1)) {
                    // right
                    if(!this.cells[cellNo+1].visited) {
                        found.push(1);
                    }
                }
                
                if(cellNo > 0 && cellNo % stride > 0) {
                    // left
                    if(!this.cells[cellNo-1].visited) {
                        found.push(3);
                    }
                }
                if(cellNo < (this.cells.length - 1) - stride) {
                    // bottom
                    if(!this.cells[cellNo + stride].visited) {
                        found.push(2);
                    }
                }
            } else {
                if(cellNo > stride - 1) {
                    // top
                    if(!this.cells[cellNo - stride].visited && !this.cells[cellNo - stride].walls[2]) {
                        found.push(0);
                    }
                }
        
                if(cellNo < this.cells.length -1 && (cellNo % stride) < (stride - 1)) {
                    // right
                    if(!this.cells[cellNo+1].visited && !this.cells[cellNo+1].walls[3]) {
                        found.push(1);
                    }
                }
                
                if(cellNo > 0 && cellNo % stride > 0) {
                    // left
                    if(!this.cells[cellNo-1].visited && !this.cells[cellNo-1].walls[1]) {
                        found.push(3);
                    }
                }
                if(cellNo < (this.cells.length - 1) - stride) {
                    // bottom
                    if(!this.cells[cellNo + stride].visited && !this.cells[cellNo + stride].walls[0]) {
                        found.push(2);
                    }
                }
            }
            
        }
    
        if(found.length > 1) {
            return found[int(random(found.length))];
        } else if(found.length == 1) {
            return found[0];
        }
        
        return -1;
    }

    /**
     * @description Function to remove cell walls when given a specific direction.
     * @param {Integer} cellNo 
     * @param {Integer} direction 
     */
    removeCellWalls(cellNo, direction) {
        let stride = Math.round(width / cellSize);
        
        // Remove current cell wall
        this.cells[this.currentCell].walls[direction] = false;
        // Remove neighbour cell wall
        switch(direction) {
            case 0:
                this.cells[cellNo - stride].walls[2] = false;
                this.cells[cellNo - stride].visited = true;
                break;
            case 1:
                this.cells[cellNo+1].walls[3] = false;
                this.cells[cellNo+1].visited = true;
                break;
            case 2:
                this.cells[cellNo + stride].walls[0] = false;
                this.cells[cellNo + stride].visited = true;
                break;
            case 3:
                this.cells[cellNo-1].walls[1] = false;
                this.cells[cellNo-1].visited = true;
                break;
        }
    }

    /**
     * @description Function to calculate the index of a neighbour cell in an array.
     * @param {Integer} cellNo 
     * @param {Integer} direction
     * @returns Index of the neighbour cell.
     */
    getNeighbourCell(cellNo, direction) {
    
        switch(direction) {
            case 0:
                return cellNo - Math.round(width/cellSize);
                break;
            case 1:
                return cellNo+1;
                break;
            case 2:
                return cellNo + Math.round(width/cellSize);
                break;
            case 3:
                return cellNo-1;
                break;
        }
    }

    /**
     * @description Function to reset all cells as not visited.
     */
    resetVisited() {
        for(let cell of this.cells) {
            cell.visited = false;
        }
    }

    /**
     * @description Function that implements the Depth First Search algorithm.
     * The function can be used to generate a maze by removing cell walls if "generated"
     * is true.
     * @param {Boolean} generated
     * @returns True if search is not complete, False when search is completed.
     */
    dfs(generated) {
        if(this.stack.length > 0) {
            this.currentCell = this.stack.pop();
            if(this.currentCell == this.toFind) {
                this.found = true;
            }
            if(!this.found) {
                let direction = this.findUnvisitedNeighbours(this.currentCell, generated);
                if(direction > -1) {
                    this.stack.push(this.currentCell);
                    if(!generated) {
                        this.removeCellWalls(this.currentCell, direction);
                    }
                    let neighbour = this.getNeighbourCell(this.currentCell, direction);
                    this.stack.push(neighbour);
                    this.cells[neighbour].visited = true;
                }
            } else {
                this.path.push(this.cells[this.currentCell]);
            }
            
            return true;
        }
        return false;
    }
}