console.log("render.js");

let wire0 = new Wire([
    ["Line", 0, 1, 0, 9],
    ["Arc", 0, 1, 1, 0],
    ["Line", 1, 0, 9, 0],
    ["Arc", 0, 9, 1, 10],
    ["Line", 1, 10, 9, 10],
    ["Arc", 9, 0, 10, 1],
    ["Line", 10, 1, 10, 9],
    ["Arc", 9, 10, 10, 9]
]);

// A little serialization test. TODO: make this into a unit test
let wire = Wire.deserialize(wire0.serialize())

function onload() {
    let g = document.getElementById("g");

    for ([type, x1, y1, x2, y2] of wire.edges) {

        // TODO check namespace url
        let newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
        newLine.setAttribute('x1',x1);
        newLine.setAttribute('y1',y1);
        newLine.setAttribute('x2',x2);
        newLine.setAttribute('y2',y2);
        newLine.setAttribute("stroke", type === "Arc" ? "red" : "black");
        newLine.setAttribute("stroke-width", ".5");
        g.append(newLine);
    }
}

onload();



