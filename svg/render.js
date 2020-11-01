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

function renderWire(deflection) {
    let wire = wires.circle;
    let serialized = wire.serialize();
    let deserialized = Wire.deserialize(serialized);
    // console.log(wire, serialized, deserialized);
    let discrete = deserialized.discretize(deflection);

// FIXME: this doesn't appear to show deflection that's 10% of radius, visually.
//let discrete = deserialized.discretize(.4);

    let s2 = discrete.serialize();
    console.log("discrete", discrete);
    console.log("%%%%% discrete serialized", s2);
    render(discrete, "red");
    render(wire, "blue");
}


selectElement = document.querySelector('#deflection');

selectElement.addEventListener('change', (event) => {
    console.log("aaaaaaaaa");
    const result = document.querySelector('#result');
    result.textContent = `Deflection ${event.target.value}`;
    removeAllSvg();
    renderWire(event.target.value)
});


function removeAllSvg() {
    let g = document.getElementById("g");

    while (g.firstChild)
        g.removeChild(g.firstChild);
}


