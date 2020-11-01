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


// http://mathforum.org/library/drmath/view/53027.html#:~:text=You%20do%20this%20just%20by,is%20just%20half%20of%20q.
function arcCenter(x1, y1, x2, y2, radius, clockwise) {

    // Midpoint between (x1, y1) and (x2, y2)
    let x3 = (x1 + x2)/2;
    let y3 = (y1 + y2)/2;

    // The distance between points 1 and 2.  We'll
    let q =  Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);

    if (clockwise) {
        let xa = x3 + Math.sqrt(radius**2 - (q/2)**2) * (y1-y2)/q;
        let ya = y3 + Math.sqrt(radius**2 - (q/2)**2) * (x2-x1)/q;
        console.log("Center: xa, ya", xa, ya, q, y1, y2, y3);
        return [xa, ya];
    }
    else {
        let xb = x3 - Math.sqrt(radius**2 - (q/2)**2) * (y1-y2)/q;
        let yb = y3 - Math.sqrt(radius**2 - (q/2)**2) * (x2-x1)/q;
        console.log("Center: xb, yb", xb, yb, q, y1, y2, y3);
        return [xb, yb];
    }


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

function drawArc(x1, y1, x2, y2, radius, clockwise) {
    // Add the actual arc
    drawElement("path", {
        class: "arc",
        d: `M ${x1} ${y1}  A ${radius} ${radius}   0 0 ${+clockwise}  ${x2} ${y2}`
    })
}

function getStep(deflection, radius) {
 //   return toRadians(30);
    let result =  2 * Math.acos(1 - deflection/radius);
    console.log(`Step for radius ${radius} and deflection ${deflection} is ${toDegrees(result)}`)
}

function drawChords(x0, y0, x, y, radius, clockwise) {
    
    // // If we are to draw counterclockwise, just swap (x0, y0) and (x, y)
    // if (!clockwise)
    //     [x0, y0, x, y] = [x, y, x0, y0];

    let [xC, yC] = arcCenter(x0, y0, x, y, radius, clockwise);
    console.log("center", xC, yC);

    // TODO: optimize trigonometric functions.

    // let xPrev = xC + radius * Math.cos(0);
    // let yPrev = yC + radius * Math.sin(0);

    let xMidpoint = (x0 + x) / 2;
    let yMidpoint = (y0 + y) / 2;


    let chordLength = Math.sqrt((x - x0) ** 2 + (y - y0) ** 2);
    //           let alpha0 = Math.asin(chordLength / (2 * radius));

    //
    let alpha0 = angle(xC, yC, x0, y0);
    let alpha = angle(xC, yC, x, y);

    console.log("alphaBefore", toDegrees(alpha0), toDegrees(alpha), clockwise);


    if (clockwise && alpha < alpha0)
        alpha += 2 * Math.PI;

    if (!clockwise && alpha > alpha0)
        alpha -= 2 * Math.PI;

    if (alpha0 > alpha)
        [alpha0, alpha] = [alpha, alpha0];



   // let step = (alpha - alpha0) / 5;

    let deflection = .3;

    let step = getStep(deflection, radius);

    console.log("alpha", toDegrees(alpha0), toDegrees(alpha), toDegrees(step));

    let xPrev;
    let yPrev;

    for (let alphai = alpha0; alphai <= alpha; alphai += step) {

        let xi = xC + radius * Math.cos(alphai);
        let yi = yC + radius * Math.sin(alphai);

        // Add daisy-shaped rays for debugging
        drawElement("line", {
            class: "ray",
            x1: xC, y1: yC,
            x2: xi, y2: yi,
        });

        // Adding the actual chords at last.
        if (xPrev !== undefined)
            drawElement("line", {
                class: "chord",
                x1: xPrev, y1: yPrev,
                x2: xi, y2: yi
            });

        xPrev = xi;
        yPrev = yi;
    }
}
function drawArcEdge(edge) {
    let x0 = edge.x0;
    let y0 = edge.y0;
    let x  = edge.x;
    let y  = edge.y;
    let radius  = edge.radius;
    let clockwise = edge.clockwise;
    drawMarker(x0, y0);
    drawArc(x0, y0, x, y, radius, clockwise);
    drawChords(x0, y0, x, y, radius, clockwise);

}

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

let wire = wires.circle;
let serialized = wire.serialize();
let deserialized = Wire.deserialize(serialized);
// console.log(wire, serialized, deserialized);
render(deserialized);



