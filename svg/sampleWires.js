"use strict";

// TODO: I'd rather use modules, but they are tricky when loading local files from hard drive due to the browser's CORS restrictions.
// There should probably be a solution to that, but I left it out of scope and am instead just polluting the
// global namespace.

let wires = {
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

    circle: Wire.startAt(8, 4)
    .addEdge(new Arc(0, 4, 4, false))
    .close(),

    lemonWedge2: Wire.startAt(0, 5)
        .addEdge(new Arc(7, 0, 5, false))
        .close(),

    original: Wire.startAt(0, 5)
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
}


// let wires = {
//     rounder: new Wire([
//         ["Line", 0, 3, 0, 7],
//         ["Arc", 0, 3, 3, 0],
//         ["Line", 3, 0, 7, 0],
//         ["Arc", 0, 7, 3, 10],
//         ["Line", 3, 10, 7, 10],
//         ["Arc", 7, 0, 10, 3],
//         ["Line", 10, 3, 10, 7],
//         ["Arc", 7, 10, 10, 7],
//         // ["Line", 0, 0, 1, 1],
//     ]),
//
//     roundest: new Wire([
//         ["Line", 0, 4, 0, 6],
//         ["Arc", 0, 4, 4, 0],
//         ["Line", 4, 0, 6, 0],
//         ["Arc", 0, 6, 4, 10],
//         ["Line", 4, 10, 6, 10],
//         ["Arc", 6, 0, 10, 4],
//         ["Line", 10, 4, 10, 6],  //
//         ["Arc", 6, 10, 10, 6],
//         // ["Line", 0, 0, 1, 1],
//     ]),
//
// // TODO ask about input
// // TODO: that assumes input is ordered clockwise.
//
//     reordered: new Wire([
//         ["Line", 0, 6, 0, 4],
//         ["Arc", 0, 4, 4, 0],
//         ["Line", 4, 0, 6, 0],
//         ["Arc", 6, 0, 10, 4],
//         ["Line", 10, 4, 10, 6],
//         ["Arc", 10, 6, 6, 10],
//         ["Line", 6, 10, 4, 10],
//         ["Arc", 4, 10, 0, 6],
//
//
//         // ["Line", 0, 0, 1, 1],
//     ]),
//
//     partial: new Wire([
//         // ["Line", 0, 4, 0, 6],
//         // ["Arc", 0, 4, 4, 0],
//         // ["Line", 4, 0, 6, 0],
//         ["Arc", 0, 6, 4, 10],
//         // ["Line", 4, 10, 6, 10],
//         // ["Arc", 6, 0, 10, 4],
//         // ["Line", 10, 4, 10, 6],
//         // ["Arc", 6, 10, 10, 6],
//         // ["Line", 0, 0, 1, 1],
//     ]),
//
// // TODO is fillet what I think it is?
//
//
//     // testing: new Wire([
//     //     Line.to(9, 0),
//     //     Arc.to (10, 1),
//     //     Line.to(10, 9),
//     //     Arc.to(9, 10),
//     //     Line.to(1, 10),
//     //     Arc.to(0, 9),
//     //     Line.to(0, 1),
//     //     Arc.to(1, 0)
//     // ]),
//
//     // testing: new Wire(0, 1)
//     //     .add(new Arc(1, 0, 1, true))
//     //     .add(new Line(9, 0))
//     //     .add(new Arc(10, 1, 1, true))
//     //     .add(new Arc(10, 9))
//     //     .add(new Arc(0, 9, 1, true))
//     //     .add(new Line(9, 1))
//     //     .add(new Arc(0, 1));
//
//
//
//
//     // original: new Wire([
//     //     ["Line", 0, 1, 0, 9],
//     //     ["Arc", 0, 1, 1, 0],
//     //     ["Line", 1, 0, 9, 0],
//     //     ["Arc", 0, 9, 1, 10],
//     //     ["Line", 1, 10, 9, 10],
//     //     ["Arc", 9, 0, 10, 1],
//     //     ["Line", 10, 1, 10, 9],
//     //     ["Arc", 9, 10, 10, 9],
//     //     // ["Line", 0, 0, 1, 1],
//     // ]),
//
//
//
// // TODO Strictly speaking, these are not wires, but we aren't checking yet
//     arcs: {
//         SW: Wire.startAt(10, 0).add("Arc", 0, 10, 1, true).close(),
//
//         NE: Wire.startAt(0, 10).add("Arc", 10, 0).close(),
//
//
//         // SE: new Wire([
//         //     ["Arc", 0, 0, 10, 10]
//         // ]),
//         //
//         // NW: new Wire([
//         //     ["Arc", 10, 10, 0, 0]
//         // ])
//     }
// }
//
//
// // TODO: consider using mixins to implement this format.
// // const notImplmeented = Wire.startAt(0, 1)
// //     .arc(1, 0)
// //     .line(9, 0)
// //     .arc(10, 1)
// //     .line(10, 9)
// //     .arc(0, 9)
// //     .line(9, 1)
// //     .arc(0, 1, 1, true)
// //     .close();
//
//
