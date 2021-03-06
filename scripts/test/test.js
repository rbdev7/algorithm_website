'use strict';

// Import the expect library.  This is what allows us to check our code.
// You can check out the full documentation at http://chaijs.com/api/bdd/
//const expect = require('chai').expect;

// Import our ColorIncreaser class.
//const ColorIncreaser = require('../sketch.js');

/* function mockColor(red, green, blue, alpha) {
    // Mock of the color class from p5
    this.levels = [];
    this.levels[0] = red;
    this.levels[1] = green;
    this.levels[2] = blue;
    this.levels[3] = alpha;
} */

describe('Sorter tests', function() {
    // Will hold the reference to the ColorIncreaser class.
    let sorter;

    // beforeEach is a special function that is similar to the setup function in
    // p5.js.  The major difference is that this function runs before each it()
    // test you create instead of running just once before the draw loop.
    // beforeEach lets you setup the objects you want to test in an easy fashon.
    beforeEach(function() {
        //let a = [];
        //let colorValueIncrease = 1;
        //let fillColor = new mockColor(0, 0,  0, 255);
        sorter = new Sorter();
    });

    it('should be an object', function(done) {
        chai.expect(sorter).to.be.a('object');
        done();
    });

    it('should have an empty array', function(done) {
        chai.expect(sorter.a).to.be.an('array').that.is.empty;
        done();
    });

    it('should generate initial random values in an array', function(done) {
        chai.expect(sorter.a).to.have.lengthOf(0);
        sorter.generateNumbers(5,10);
        chai.expect(sorter.a).to.have.lengthOf(5);
        let a = sorter.a;
        sorter.generateNumbers(5,10);
        chai.expect(sorter.a.length).to.be.equal(5);
        chai.expect(sorter.a).to.not.be.equal(a);
        done();
    });

    it('should sort random numbers in an array from lowest to heighest', function(done) {
        let num = 5;
        sorter.generateNumbers(num,10);
        
        // Create a bubble sort object from the bubbleSort generator function.
        let bSort = sorter.bubbleSort(); 
        let msg = bSort.next();
        while(!msg.done) {
            msg = bSort.next();
        }

        for(let i=0; i<num-1; i++) {
            chai.expect(sorter.a[i+1]).to.be.least(sorter.a[i]); 
        }
        done();
    });
    /* it('should have rgb values 255, 0, 0 after calling increaseFillColor 255 times', function(done) {
        // it is 256^1 - 1 because it starts with the colour black.
        for(let count = 0; count < 255; count += 1) {
            colorIncreaser.increaseFillColor();
        }
        chai.expect(colorIncreaser.fillColor.levels[0]).to.equal(255);
        chai.expect(colorIncreaser.fillColor.levels[1]).to.equal(0);
        chai.expect(colorIncreaser.fillColor.levels[2]).to.equal(0);
        done();
    });

    it('should have rgb values 255, 255, 0 after calling increaseFillColor 65535 times', function(done) {
        // it is 256^2 -1 because it starts with the colour black.
        for(let count = 0; count < 65535; count += 1) {
            colorIncreaser.increaseFillColor();
        }
        chai.expect(colorIncreaser.fillColor.levels[0]).to.equal(255);
        chai.expect(colorIncreaser.fillColor.levels[1]).to.equal(255);
        chai.expect(colorIncreaser.fillColor.levels[2]).to.equal(0);
        done();
    });

    it('should have rgb values 255, 255, 255 after calling increaseFillColor 16777215 times', function(done) {
        // it is 256^3 - 1 because it starts with the colour black
        for(let count = 0; count < 16777215; count += 1) {
            colorIncreaser.increaseFillColor();
        }
        chai.expect(colorIncreaser.fillColor.levels[0]).to.equal(255);
        chai.expect(colorIncreaser.fillColor.levels[1]).to.equal(255);
        chai.expect(colorIncreaser.fillColor.levels[2]).to.equal(255);
        done();
    }); */
});