console.log("------------------- render.js");

// import { hello } from './wireSamples.js';
// console.log("render.js", hello());
// TODO <script type="module" src="..."></script>

// Works for NW, SE, SW.
// Broken for NE

// A little serialization test. TODO: make this into a unit test
// TODO let wire = Wire.deserialize(wires.original.serialize())


function addElement(name, attributes) {
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
function addMarker(x, y) {
    addElement("line", {
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
    addElement("line", {
        class: "line",
        x1, y1, x2, y2,
    })

}

function drawArcEdge() {

}

function render(wire) {

    for (const edge of wire.edges) {

        // TODO fix the discrepancy in names
        let x1 = edge.x0;
        let y1 = edge.y0;
        let x2 = edge.x;
        let y2 = edge.y;


        if (edge.constructor.name === "Line") { // TOD
            drawLineEdge(edge);
        } else {

            let r = edge.r;

            addMarker(x1, y1);

            // TODO assert ry === rx. Circle, not ellipse.
            const r2 = Math.abs(x2 - x1);

            //          assert(r === r2), // FIXME  What am I doing here?
            //    let arc = Math.sign((x2 - x1) || (y2 - y1));


            // Add the actual arc
            addElement("path", {
                class: "arc",
                d: `M ${x1} ${y1}  A ${r} ${r}   0 0 1  ${x2} ${y2}`
            })

            let [xC, yC] = arcCenter(x1, y1, x2, y2);
            console.log("center", xC, yC);

            // TODO: optimize trigonometric functions.

            // let x0 = xC + r * Math.cos(0);
            // let y0 = yC + r * Math.sin(0);

            let xMidpoint = (x1 + x2) / 2;
            let yMidpoint = (y1 + y2) / 2;


            let chordLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            //           let alpha0 = Math.asin(chordLength / (2 * r));


            let alpha0 = angle(xC, yC, x1, y1);
//            let alpha1 = angle(xC, yC, x2, y2);
            let alpha1 = alpha0 + Math.PI / 2;

            console.log("alpha", toDegrees(alpha0), toDegrees(alpha1));

            let step = (alpha1 - alpha0) / 3;

            let x0;
            let y0;

            for (let alpha = alpha0; alpha <= alpha1; alpha += step) {
                let x = xC + r * Math.cos(alpha);
                let y = yC + r * Math.sin(alpha);

                // Add daisy-shaped rays for debugging
                addElement("line", {
                    class: "ray",
                    x1: xC, y1: yC,
                    x2: x, y2: y,
                });

                // Adding the actual chords at last.
                if (x0 !== undefined)
                    addElement("line", {
                        class: "chord",
                        x1: x0, y1: y0,
                        x2: x, y2: y
                    });

                // console.log("Chord: ", {
                //     class: "chord",
                //     x1: x0, y1: y0,
                //     x2: x, y2: y
                // })

                x0 = x;
                y0 = y;
            }

        }
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

