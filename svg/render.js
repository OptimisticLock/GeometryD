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

/**
 * Calculates the angle to the horizon of a line connexting (x0, y0) and (x, y)
 * @param x0
 * @param y0
 * @param x
 * @param y
 * @return {number} angle
 */
function angle(x0, y0, x, y) {
    let dx = x - x0;
    let dy = y - y0;
    let angle = Math.atan2(dy, dx);
    return angle;
}

function drawLineEdge(edge) {

    // TODO fix the discrepancy in names
    let x1 = edge.x0;
    let y1 = edge.y0;
    let x2 = edge.x;
    let y2 = edge.y;

    // The actual line from the wire
    drawElement("line", {
        class: "line",
        x1, y1, x2, y2,
    })
}


function drawArcEdge(edge) {

    drawElement("path", {
        class: "arc",
        d: `M ${edge.x0} ${edge.y0}  A ${edge.radius} ${edge.radius}   0 0 ${+edge.clockwise}  ${edge.x} ${edge.y}`
    })}

function render(wire) {

    for (const edge of wire.edges) {
        if (edge.constructor.name === "Line")
            drawLineEdge(edge);
        else
            drawArcEdge(edge);
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

let wire = wires.original;
let serialized = wire.serialize();
let deserialized = Wire.deserialize(serialized);
// console.log(wire, serialized, deserialized);
let discrete = deserialized.discretize(.01);
render(discrete);



