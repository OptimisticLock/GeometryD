let rounder = new Wire([
    ["Line", 0, 3, 0, 7],
    ["Arc", 0, 3, 3, 0],
    ["Line", 3, 0, 7, 0],
    ["Arc", 0, 7, 3, 10],
    ["Line", 3, 10, 7, 10],
    ["Arc", 7, 0, 10, 3],
    ["Line", 10, 3, 10, 7],
    ["Arc", 7, 10, 10, 7],
    // ["Line", 0, 0, 1, 1],
]);

let roundest = new Wire([
    ["Line", 0, 4, 0, 6],
    ["Arc", 0, 4, 4, 0],
    ["Line", 4, 0, 6, 0],
    ["Arc", 0, 6, 4, 10],
    ["Line", 4, 10, 6, 10],
    ["Arc", 6, 0, 10, 4],
    ["Line", 10, 4, 10, 6],  //
    ["Arc", 6, 10, 10, 6],
    // ["Line", 0, 0, 1, 1],
]);

// TODO ask about input
// TODO: that assumes input is ordered clockwise.

let reordered = new Wire([
    ["Line", 0, 6, 0, 4],
    ["Arc", 0, 4, 4, 0],
    ["Line", 4, 0, 6, 0],
    ["Arc", 6, 0, 10, 4],
    ["Line", 10, 4, 10, 6],
    ["Arc", 10, 6, 6, 10],
    ["Line", 6, 10, 4, 10],
    ["Arc", 4, 10, 0, 6],


    // ["Line", 0, 0, 1, 1],
]);

let partial = new Wire([
    // ["Line", 0, 4, 0, 6],
    // ["Arc", 0, 4, 4, 0],
    // ["Line", 4, 0, 6, 0],
    ["Arc", 0, 6, 4, 10],
    // ["Line", 4, 10, 6, 10],
    // ["Arc", 6, 0, 10, 4],
    // ["Line", 10, 4, 10, 6],
    // ["Arc", 6, 10, 10, 6],
    // ["Line", 0, 0, 1, 1],
]);

// TODO is fillet what I think it is?
// TODO const
// TODO Typescript?

let wire0 = new Wire([
    ["Line", 0, 1, 0, 9],
    ["Arc", 0, 1, 1, 0],
    ["Line", 1, 0, 9, 0],
    ["Arc", 0, 9, 1, 10],
    ["Line", 1, 10, 9, 10],
    ["Arc", 9, 0, 10, 1],
    ["Line", 10, 1, 10, 9],
    ["Arc", 9, 10, 10, 9],
    // ["Line", 0, 0, 1, 1],
]);

// export function hello() {
//     return "Hello";
// }
