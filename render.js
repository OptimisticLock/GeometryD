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

    let arc = document.createElementNS('http://www.w3.org/2000/svg','path');
    // <path d="M 5 6   A 6 6    0 0 1   1 1"
    //       stroke="green"
    //       stroke-width=".1" fill-opacity="0"/>

    arc.setAttribute('d', "M 5 6   A 6 6    0 0 1   1 1");
    arc.setAttribute("stroke", "green");
    g.setAttribute("stroke-width", .1);
    g.setAttribute("fill-opacity", 0);
    g.append(arc);

    for (const [type, x1, y1, x2, y2] of wire.edges) {

        // TODO check namespace url
        let line = document.createElementNS('http://www.w3.org/2000/svg','line');
        line.setAttribute('x1',x1);
        line.setAttribute('y1',y1);
        line.setAttribute('x2',x2);
        line.setAttribute('y2',y2);
        line.setAttribute("stroke", type === "Arc" ? "red" : "black");
        line.setAttribute("stroke-width", ".1");
        g.append(line);
    }
}

onload();



