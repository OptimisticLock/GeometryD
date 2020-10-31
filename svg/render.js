console.log("------------------- render.js");

// import { hello } from './wireSamples.js';
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


function angle(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;

    if (x1 === x2 && y1 > y2)
        return -Math.PI / 2;

    if (x1 === x2 && y1 < y2)
        return Math.PI / 2;

    if (y1 === y2 && x1 < x2)
        return 0;

    if (y1 === y2 && x1 > x2)
        return Math.PI;

    // TODO   assert (false, `Invalid arch radius: ${x1}, ${y1}, ${x2}, ${y2}`)
}


function arcCenter(x1, y1, x2, y2) {

    if (Math.sign(x2 - x1) === Math.sign(y2 - y1))
        return [x1, y2];
    else
        return [x2, y1];
}

// Add a short marker line to help debugging
function drawMarker(x, y) {
    drawElement("line", {
        class: "marker",
        x, y,
        x2: x - .5, y2: y - .5,
    })
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

function drawArc(x1, y1, x2, y2, r = 1, clockwise = true) {
    // Add the actual arc
    drawElement("path", {
        class: "arc",
        d: `M ${x1} ${y1}  A ${r} ${r}   0 0 ${+clockwise}  ${x2} ${y2}`
    })
}

function drawChords(x0, y0, x, y, r = 1, clockwise = true) {
    
    // If we are to draw counterclockwise, just swap (x0, y0) and (x, y)
    if (!clockwise)
        [x0, y0, x, y] = [x, y, x0, y0];

    let [xC, yC] = arcCenter(x0, y0, x, y);
    console.log("center", xC, yC);

    // TODO: optimize trigonometric functions.

    // let xPrev = xC + r * Math.cos(0);
    // let yPrev = yC + r * Math.sin(0);

    let xMidpoint = (x0 + x) / 2;
    let yMidpoint = (y0 + y) / 2;


    let chordLength = Math.sqrt((x - x0) ** 2 + (y - y0) ** 2);
    //           let alpha0 = Math.asin(chordLength / (2 * r));


    let alpha0 = angle(xC, yC, x0, y0);
//            let alpha1 = angle(xC, yC, x, y);
    let alpha1 = alpha0 + Math.PI / 2;

    console.log("alpha", toDegrees(alpha0), toDegrees(alpha1));

    let step = (alpha1 - alpha0) / 3;

    let xPrev;
    let yPrev;

    for (let alpha = alpha0; alpha <= alpha1; alpha += step) {
        let x = xC + r * Math.cos(alpha);
        let y = yC + r * Math.sin(alpha);

        // Add daisy-shaped rays for debugging
        drawElement("line", {
            class: "ray",
            x1: xC, y1: yC,
            x2: x, y2: y,
        });

        // Adding the actual chords at last.
        if (xPrev !== undefined)
            drawElement("line", {
                class: "chord",
                x1: xPrev, y1: yPrev,
                x2: x, y2: y
            });

        xPrev = x;
        yPrev = y;
    }
}
function drawArcEdge(edge) {
    // TODO fix the discrepancy in names

    let x0 = edge.x0;
    let y0 = edge.y0;
    let x = edge.x;
    let y = edge.y;
    let r = edge.r;
    drawMarker(x0, y0);

    // TODO assert ry === rx. Circle, not ellipse.
    const r2 = Math.abs(x - x0);

    //          assert(r === r2), // FIXME  What am I doing here?
    //    let arc = Math.sign((x - x1) || (y - y0));


    drawArc(x0, y0, x, y, r, false);
    drawChords(x0, y0, x, y, r);
}

function render(wire) {

    for (const edge of wire.edges) {
        if (edge.constructor.name === "Line")
            drawLineEdge(edge);
        else
            drawArcEdge(edge);
    }
}


let wire = wires.original;
render(wire);

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

