/**
 * @author Roy Burgess
 * @date 18/07/2020
 * @version 1.0
 * @class
 * @classdesc Class to implement sorting algorithms.
 */
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
        let swapped = true;
        let end = this.a.length - 1;
        while(swapped) {
            swapped = false;
            for(let i = 0; i < end; i++) {
                if (this.a[i] > this.a[i + 1]) {
                    // swap
                    let t = this.a[i];
                    this.a[i] = this.a[i + 1];
                    this.a[i + 1] = t;
                    swapped = true
                }
                yield;
            }
            end--;
        }
    }
    
    /**
     * Implementation of the Selection Sort algorithm.
     */
    selectionSort() {
        const n = this.a.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (this.a[j] < this.a[minIndex]) {
                    minIndex = j;
                }
            }
            // Swap the minimum element with the current element
            if (minIndex !== i) {
                const temp = this.a[i];
                this.a[i] = this.a[minIndex];
                this.a[minIndex] = temp;
            }
        }
    }
}

module.exports = Sorter;