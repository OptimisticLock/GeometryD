"use strict";

console.log("------------------- render.js");

// import { hello } from './sampleWires.js';
// console.log("render.js", hello());
// TODO <script type="module" src="..."></script>

// Works for NW, SE, SW.
// Broken for NE

// A little serialization test. TODO: make this into a unit test
// TODO let wire = Wire.deserialize(wires.original.serialize())


function drawElement(name, attributes) {
    let g = document.getElementById("g");

    // TODO check namespace url
    let elem = document.createElementNS('http://www.w3.org/2000/svg', name);

    for (const attribute in attributes)
        elem.setAttribute(attribute, attributes[attribute]);

    g.append(elem);
}

function drawLineEdge(edge, color = "black") {

    // TODO fix the discrepancy in names
    let x1 = edge.x0;
    let y1 = edge.y0;
    let x2 = edge.x;
    let y2 = edge.y;

    // The actual line from the wire
    drawElement("line", {
        class: "line",
        stroke: color,
        x1, y1, x2, y2,
    })
}


function drawArcEdge(edge, color = "black") {

    drawElement("path", {
        class: "arc",
        stroke: color,
        d: `M ${edge.x0} ${edge.y0}  A ${edge.radius} ${edge.radius}   0 0 ${+edge.clockwise}  ${edge.x} ${edge.y}`
    })
}

function render(wire, color) {

    for (const edge of wire.edges) {

        // This is the only place where Arcs are hard-coded, but this is just for debugging
        if (edge.constructor.name === "Line")
            drawLineEdge(edge, color);
        else
            drawArcEdge(edge, color);
    }
}


function toDegrees(radians) {
    return radians * 360 / (2 * Math.PI);
}

function toRadians(degrees) {
    return degrees * 2 * Math.PI / 360;
}


let svg = document.getElementById("svg");
let point = svg.createSVGPoint();  // Created once for document

g.addEventListener('mousemove', evt => {
//    console.log("evt", evt);
    let element = evt.target;

    point.x = evt.clientX;
    point.y = evt.clientY;

    // The cursor point, translated into svg coordinates
    let cursorPoint = point.matrixTransform(g.getScreenCTM().inverse());
    let coords = "(" + cursorPoint.x.toFixed(1) + ", " + cursorPoint.y.toFixed(1) + ")";

    document.getElementById("coords").innerText = coords;
});

document.getElementById("serialized").addEventListener("keypress", function(event) {
    if (event.key === "Enter" && !event.ctrlKey) {
        let str = document.getElementById("serialized").innerText;
        console.log(str);
        try {
            let wire = Wire.deserialize(str);
            renderWire(wire, .1);
        } catch (e) {
            console.log(e);
        }
        event.preventDefault();
    }
})

function removeAllSvg() {
    let g = document.getElementById("g");

    while (g.firstChild)
        g.removeChild(g.firstChild);
}


function renderWire(wire, deflection) {
    let discrete = wire.discretize(deflection);
    render(discrete, "red");
    render(wire, "gray");
}

document.querySelector('#deflection').addEventListener('change', selectionChanged);
document.querySelector('#wire').addEventListener('change', selectionChanged);

function selectionChanged() {
    let wireName = document.querySelector("#wire").value;
    let deflection = document.querySelector("#deflection").value;
    let wire = wires[wireName];

    removeAllSvg();
    renderWire(wire, deflection);
    showSerialized(wire);
}

let wire = document.getElementById("wire");

for (let wireName of Object.keys(wires)) {
    let option = document.createElement("option");
    option.text = wireName;
    // option.value = "myvalue";
    wire.appendChild(option);
}



//document.querySelector('#wire').appendChild()


selectionChanged();


function showSerialized(wire) {
    let serialized = wire.serialize();
    serialized = serialized.replaceAll(",\[", ",\n[");

    const ser = document.querySelector('#serialized');
    ser.textContent = serialized;

    let deserialized = Wire.deserialize(serialized);
    // console.log(wire, serialized, deserialized);

    // let s2 = discrete.serialize();
    // console.log("discrete", discrete);
    // console.log("%%%%% discrete serialized", s2);

}



