"use strict";

// TODO: I'd rather use modules, but they are tricky when loading local files from hard drive due to the browser's CORS restrictions.
// There should probably be a solution to that, but I left it out of scope and am instead just polluting the
// global namespace.

let wires = {
    original: Wire.startAt(0,1)
            .addEdge(new Arc(1, 0))
            .addEdge(new Line(9, 0))
            .addEdge(new Arc(10, 1))
            .addEdge(new Line(10, 9))
            .addEdge(new Arc(9, 10))
            .addEdge(new Line(1, 10))
            .addEdge(new Arc(0, 9))
            .addEdge(new Line(0, 1))
            .close(),

    bowtie: Wire.startAt(2, 4)
        .addEdge(new Line(12, 8))
        .addEdge(new Arc(12, 4, 6, true))    //
        .addEdge(new Line(2, 8))
        .addEdge(new Arc(2, 4, 6, false))     //
        .close(),

    bowtie2: Wire.startAt(2, 4)
        .addEdge(new Line(12, 8))
        .addEdge(new Arc(12, 4, 6, false))    //
        .addEdge(new Line(2, 8))
        .addEdge(new Arc(2, 4, 6, true))     //
        .close(),


    sansCorners: Wire.startAt(0,4)
        .addEdge(new Arc(4, 0, 3, false))
        .addEdge(new Line(6, 0))
        .addEdge(new Arc(10, 6, 4, false))
        .addEdge(new Line(10, 9))
        .addEdge(new Arc(6, 10, 5, false))
        .addEdge(new Line(4, 10))
        .addEdge(new Arc(0, 6, 6, false))
        .close(),

    cheese: Wire.startAt(0, 5)
        .addEdge(new Arc(7, 0, 5, false))
        .addEdge(new Line(9, 0))
        .addEdge(new Arc(10, 1))
        .addEdge(new Line(10, 9))
        .addEdge(new Arc( 9, 10))
        .addEdge(new Line(1, 10))
        .addEdge(new Arc(0, 8, 2.5, false))
        .close(),

    lemonWedge: Wire.startAt(6, 1)
        .addEdge(new Arc(5, 10, 6, false))
        // .addEdge(new Line(2, 10))
        // .addEdge(new Line(2, 9))
        // .addEdge(new Line(3, 9))
        // .addEdge(new Line(3, 8))
        // .addEdge(new Line(1, 10))
        // .addEdge(new Line(1.4, 5.3))
        // .addEdge(new Line(0, 5.3))
        // .addEdge(new Line(1.4, 5.3))
        .close(),

    circle: Wire.startAt(8, 4)
        .addEdge(new Arc(0, 4, 4, false))
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

