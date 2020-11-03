"use strict";

// import { hello } from './sampleWires.js';
// TODO <script type="module" src="..."></script>

/**
 * Create an SVG element and append it to the parent.
 * @param name - SVG name, e.g. "line" or "arc"
 * @param attributes - attributes of the SVG element, e.g. "color"
 */
function drawElement(name, attributes) {
    const g = document.getElementById("g");
    const elem = document.createElementNS('http://www.w3.org/2000/svg', name);

    for (const attribute in attributes)
        elem.setAttribute(attribute, attributes[attribute]);

    g.append(elem);
}

/**
 * Draws a line edge using SVG
 * @param {Line} line
 * @param color
 */
function drawLineEdge(line, color = "black") {

    // The actual line from the wire
    drawElement("line", {
        class: "line",
        stroke: color,
        x1:line.x0, y1:line.y0, x2:line.x, y2:line.y
    })
}

/**
 * Draws an arc edge using SVG
 * @param {Arc} arc
 * @param color
 */
function drawArcEdge(arc, color = "black") {
    drawElement("path", {
        class: "arc",
        stroke: color,
        // TODO: one of flags below allows to draw an arc > 180 degrees. Currently, these have to be combined out of 2 arcs
        d: `M ${arc.x0} ${arc.y0}  A ${arc.radius} ${arc.radius}   0 0 ${+arc.clockwise}  ${arc.x} ${arc.y}`
    })
}


/**
 * Renders a wire using SVG
 * @param wire
 * @param color
 * TODO: as simple as this method is, it should exist in Wire, as im `wire.render(renderer)`.
 * This way, SVG graphics described in `render.js` would be only one out of possible Renderer implementations.
 */
function render(wire, color) {

    for (const edge of wire.edges) {

        // This is the only place where specific edge types are hard-coded, but this is just a debugging tool
        if (edge.getType() === "Line")
            drawLineEdge(edge, color);
        else
            drawArcEdge(edge, color);
    }
}


const svgElement = document.getElementById("svg");
const svgPoint = svgElement.createSVGPoint();  // Created once for document

// On mousemove, show coordinates on the page. A handy debugging tool.
g.addEventListener('mousemove', evt => {
 //   let element = evt.target;

    svgPoint.x = evt.clientX;
    svgPoint.y = evt.clientY;

    // The cursor point, translated into svg coordinates
    const cursorPoint = svgPoint.matrixTransform(g.getScreenCTM().inverse());
    const coords = "(" + cursorPoint.x.toFixed(1) + ", " + cursorPoint.y.toFixed(1) + ")";

    document.getElementById("coords").innerText = coords;
});


// Turns the #seralized HTML element into a wire editor, allowing to parse and display edited wires.
// It's kind of raw, but better than nothing. Also demoes deserialization.
// Listen to "Enter", but not to shift-enter, which is still a newline.

document.getElementById("serialized").addEventListener("keypress", function(event) {
    if (event.key === "Enter" && !event.ctrlKey && !event.shiftKey) {
        event.preventDefault();
        const str = document.getElementById("serialized").innerText;
        console.log(str);
        try {
            const wire = Wire.deserialize(str);
            removeAllSvg();
            renderWire(wire, .1);
        } catch (e) {
             handleError(e);
        }
    }
})

/**
 * Removes all svg elements from the parent g element, erasing the old drawing
 */
function removeAllSvg() {
    const g = document.getElementById("g");

    while (g.firstChild)
        g.removeChild(g.firstChild);
}

/**
 * Discretizes and renders the wire.
 * In fact, two renderings take place. The original wire in gray, the discretized one, in red
 * @param wire
 * @param deflection
 */
function renderWire(wire, deflection) {
    // TODO Doing this for no particular reason expect to meet requirement 3 (and eat own dogfood).
    // There is another example of serialization and deserialization in the code as well.
    const deserialized = Wire.deserialize(wire.serialize());
    const discrete = deserialized.discretize(deflection);
    render(discrete, "red");
    render(deserialized, "gray");

    const collisions = wire.getCollisions();

    for (let collision of collisions) {
  //      console.log("~~~~ Collision: ", collision);

        drawElement("circle", {
            class: "collision",
            cx: collision.x,
            cy: collision.y,
        });

 //           <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />

    }
}

document.querySelector('#deflection').addEventListener('change', selectionChanged);
document.querySelector('#wire').addEventListener('change', selectionChanged);

function selectionChanged() {
    const wireName = document.querySelector("#wire").value;
    const deflection = document.querySelector("#deflection").value;
    const wire = wires[wireName];

    removeAllSvg();
    renderWire(wire, deflection);
    showSerialized(wire);

}

const wireElement = document.getElementById("wire");

for (let wireName of Object.keys(wires)) {
    const option = document.createElement("option");
    option.text = wireName;
    // option.value = "myvalue";
    wireElement.appendChild(option);
}


/**
 * Serializes the wire and shows it in the editor
 * @param wire
 */
function showSerialized(wire) {
    let serialized = wire.serialize();

    // Nice to add some white space where needed. JSON.serialize() adds either too much or too little.
    serialized = serialized.replaceAll(",\[", ",\n[");

    const ser = document.querySelector('#serialized');
    ser.textContent = serialized;
}

selectionChanged();
//document.getElementById("serialized").focus();
document.getElementById("serialized").click()


