class Sorter {
    constructor() {
        this.a = [];
    }

    /**
     * Function to generate an array of random numbers.
     * 
     * @param {Integer} num Number of random numbers to generate.
     * @param {Integer} maxHeight Maximum value, provided by P5.js "height" keyword.
     */
    generateNumbers(num, maxHeight) {
        this.a = [];
        for(let i=0; i < num; i++) {
            this.a[i] = Math.floor(Math.random() * maxHeight);
        }
    }

    /**
     * Implementation of the bubble sort algorithm.
     * This function is a generator function.  This allows the function to be
     * stopped (using 'yield') part way through execution and resumed (using 'next()').
     */
    * bubbleSort() {
        let swapped=true;
        while(swapped) {
            swapped = false;
            for(let i = 0; i < this.a.length - 1; i++) {
                if (a[i] > a[i + 1]) {
                    // swap
                    let t = this.a[i];
                    this.a[i] = this.a[i + 1];
                    this.a[i + 1] = t;
                    swapped = true
                }
                yield;
            }
        }
    } 
}

module.exports = Sorter;