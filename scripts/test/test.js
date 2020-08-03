'use strict';

// Import the expect library.  This is what allows us to check our code.
// You can check out the full documentation at http://chaijs.com/api/bdd/
//const expect = require('chai').expect;

// Import our ColorIncreaser class.
//const ColorIncreaser = require('../sketch.js');

function mockColor(red, green, blue, alpha) {
    // Mock of the color class from p5
    this.levels = [];
    this.levels[0] = red;
    this.levels[1] = green;
    this.levels[2] = blue;
    this.levels[3] = alpha;
}

describe('Sorter tests', function() {
    // Will hold the reference to the ColorIncreaser class.
    let sorter;

    // beforeEach is a special function that is similar to the setup function in
    // p5.js.  The major difference is that this function runs before each it()
    // test you create instead of running just once before the draw loop.
    // beforeEach lets you setup the objects you want to test in an easy fashon.
    beforeEach(function() {
        let a = [];
        //let colorValueIncrease = 1;
        //let fillColor = new mockColor(0, 0,  0, 255);
        sorter = new Sorter();
    });

    it('should be an object', function(done) {
        chai.expect(sorter).to.be.a('object');
        done();
    });

    /* it('should store initial values without mutation', function(done) {
        chai.expect(colorIncreaser.colorValueIncrease).to.be.equal(1);
        chai.expect(colorIncreaser.fillColor.levels[0]).to.equal(0);
        chai.expect(colorIncreaser.fillColor.levels[1]).to.equal(0);
        chai.expect(colorIncreaser.fillColor.levels[2]).to.equal(0);
        chai.expect(colorIncreaser.fillColor.levels[3]).to.equal(255);
        done();
    });

    it('should have rgb values 255, 0, 0 after calling increaseFillColor 255 times', function(done) {
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