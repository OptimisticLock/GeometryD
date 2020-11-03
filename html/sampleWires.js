"use strict";

// TODO: I'd rather use modules, but they are tricky when loading local files from hard drive due to the browser's CORS restrictions.
// There should probably be a solution to that, but I left it out of scope and am instead just polluting the
// global namespace.

let wires = {

    randomArcs: generateRandomArcWire(),
    randomLines: generateRandomLinearWire(),

    // Bowtie deserialization as requested.
    // TODO: Only when editing this string in built-in editor did I realize how user-unfriendly these numbers are. Turtle graphics?
    deserializedBowtie: Wire.deserialize(
        '[' +
        '["Line",14,8],             \n' +
        '["Arc",15,7,1,false],      \n' +
        '["Line", 15, 4],           \n' +
        '["Arc", 14, 3, 1, false],  \n' +
        '["Line",1,8],              \n' +
        '["Arc", 0, 7],             \n' +
        '["Line", 0, 4],            \n' +
        '["Arc",1,3,1,true]]'),


    roundedSquare: Wire.startAt(0, 1)
        .addEdge(new Arc(1, 0))
        .addEdge(new Line(9, 0))
        .addEdge(new Arc(10, 1))
        .addEdge(new Line(10, 9))
        .addEdge(new Arc(9, 10))
        .addEdge(new Line(1, 10))
        .addEdge(new Arc(0, 9))
        .addEdge(new Line(0, 1))
        .close(),

    bowtie1: Wire.startAt(2, 4)
        .addEdge(new Line(12, 8))
        .addEdge(new Arc(12, 4, 6, false))
        .addEdge(new Line(2, 8))
        .addEdge(new Arc(2, 4, 6, true))     //
        .close(),


    bowtieA2: Wire.startAt(2, 4)
        .addEdge(new Line(12, 8))
        .addEdge(new Arc(12, 4, 6, true))
        .addEdge(new Line(2, 8))
        .addEdge(new Arc(2, 4, 6, false))
        .close(),


    bowtie3: Wire.startAt(2, 4)
        .addEdge(new Line(12, 8))
        .addEdge(new Arc(12, 4, 2, true))    //
        .addEdge(new Line(2, 8))
        .addEdge(new Arc(2, 4, 2, false))     //
        .close(),


    cheese: Wire.startAt(0, 4)
        .addEdge(new Arc(4, 0, 3, false))
        .addEdge(new Line(6, 0))
        .addEdge(new Arc(10, 6, 4, false))
        .addEdge(new Line(10, 9))
        .addEdge(new Arc(6, 10, 5, false))
        .addEdge(new Line(4, 10))
        .addEdge(new Arc(0, 6, 6, false))
        .close(),

    cheese2: Wire.startAt(0, 5)
        .addEdge(new Arc(7, 0, 5, false))
        .addEdge(new Line(9, 0))
        .addEdge(new Arc(10, 1))
        .addEdge(new Line(10, 9))
        .addEdge(new Arc(9, 10))
        .addEdge(new Line(1, 10))
        .addEdge(new Arc(0, 8, 2.5, false))
        .close(),

    lemonWedge: Wire.startAt(6, 1)
        .addEdge(new Arc(5, 10, 6, false))
        .close(),

    circle: Wire.startAt(8, 4)
        .addEdge(new Arc(0, 4, 4, false))
        .addEdge(new Arc(8, 4, 4, false))
        .close(),

    weird: Wire.startAt(0, 1)
        .addEdge(new Arc(1, 2, 1, false))
        .addEdge(new Line(9, 8))
        .addEdge(new Arc(9, 9))
        .addEdge(new Line(9, 1))
        .addEdge(new Arc(9, 1, 1, true))
        .close(),


    weird2: Wire.startAt(5, 5)
        .addEdge(new Arc(5, 4.9, 6, false))
        .close(),  // FIXME does this draw correctly?

    // TODO: have a way to describe arcs with angle 180 degrees using
    // a single arc. Presently, that requires two ars.

    lemonWedge2: Wire.startAt(0, 5)
        .addEdge(new Arc(7, 0, 5, false))
        .close()
}

function random() {
    return Math.random() * 10;
}

function generateRandomLinearWire() {
    const wire = Wire.startAt(random(), random())
    const nWires = random() * 5;

    for (let i = 0; i < nWires; i++)
        wire.addEdge(new Line(random(), random()));

    wire.close();
    return wire;
}

function generateRandomArcWire() {
    try {
        const wire = Wire.startAt(random(), random())
        const nWires = random() * 5;
        let clockwise = true;

        let x0 = 0;
        let y0 = 0;

        for (let i = 0; i < nWires; i++) {
            let x = random();
            let y = random();
            let r = Math.sqrt((x - x0) ** 2 + (y - y0) ** 2) * 1.5; //+ Math.random() * .3 + .01;
            wire.addEdge(new Arc(x, y, r, clockwise));
            clockwise = !clockwise;
            x0 = x;
            y0 = y;
        }

//   ErrorHandler.quieter = true;
        wire.close(); // This triggers validation, and some arcs are invalid.. hmm..
//    ErrorHandler.quieter = false;

        return wire;
      // Something wrong with my calculation of radius?
    } catch (error) {
        return Wire.startAt(0, 0)
            .addEdge(new Line(1, 10))
            .addEdge(new Line(5, 10))
            .close();
    }


}
