console.log("render.js");

let wire = new Wire([
    ["Line", 0, 1, 0, 9],
    ["Arc", 0, 1, 1, 0],
    ["Line", 1, 0, 9, 0],
    ["Arc", 0, 9, 1, 10],
    ["Line", 1, 10, 9, 10],
    ["Arc", 9, 0, 10, 1],
    ["Line", 10, 1, 10, 9],
    ["Arc", 9, 10, 10, 9]
]);

let svg = document.getElementById("svg");


