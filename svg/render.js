

// import { hello } from './wireSamples.js';
// console.log("render.js", hello());
// TODO <script type="module" src="..."></script>


// A little serialization test. TODO: make this into a unit test
let wire = Wire.deserialize(reordered.serialize())

function addElement(name, attributes) {
    let g = document.getElementById("g");

    // TODO check namespace url
    let elem = document.createElementNS('http://www.w3.org/2000/svg', name);

    for (const attribute in attributes)
        elem.setAttribute(attribute, attributes[attribute]);

    g.append(elem);
}


function arcCenter(x1, y1, x2, y2) {

    if (Math.sign(x2 - x1) === Math.sign(y2 - y1))
        return [x1, y2];
    else
        return [x2, y1];
}

function onload() {

    for (const [type, x1, y1, x2, y2] of wire.edges) {

        if (type === "Arc") {

            // Add a short line to help debugging
            addElement("line", {
                class: "marker",
                x1, y1,
                x2: x1 - .5, y2: y1 - .5,
            })

            // TODO assert ry === rx. Circle, not ellipse.
            const r = Math.abs(x2 - x1);
            //    let arc = Math.sign((x2 - x1) || (y2 - y1));


            // Add the actual arc
            addElement("path", {
                class: "arc",
                d: `M ${x1} ${y1}  A ${r} ${r}   0 0 1  ${x2} ${y2}`
            })

            let [xC, yC] = arcCenter(x1, y1, x2, y2);

            // TODO: optimize trigonometric functions.

            // let x0 = xC + r * Math.cos(0);
            // let y0 = yC + r * Math.sin(0);

            let xMidpoint = (x1 + x2) / 2;
            let yMidpoint = (y1 + y2) / 2;


            let chordLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
 //           let alpha0 = Math.asin(chordLength / (2 * r));

            let alpha0 = 0;
            let alpha1 = toRadians(350);
            let step = toRadians(2);

            let x0 = xC;
            let y0 = yC;
            for (let alpha = alpha0; alpha <= alpha1; alpha += step) {
                let x = xC + r * Math.cos(alpha) * Math.sign(x2 - x1);
                let y = yC + r * Math.sin(alpha) * Math.sign(y2 - y1);

                // Add daisy-shaped rays for debugging
                addElement("line", {
                    class: "ray",
                    x1: xC, y1: yC,
                    x2: x, y2: y,
                });

                // Add the actual chords
                addElement("line", {
                    class: "chord",
                    x1: x0, y1: y0,
                    x2: x, y2: y
                });

                console.log("Chord: ", {
                    class: "chord",
                    x1: x0, y1: y0,
                    x2: x, y2: y
                })

                x0 = x; y0 = y;
            }

            //         let alpha = -Math.PI / 4; // 45 degrees

        } else {

            // The actual line from the wire
            addElement("line", {
                class: "line",
                x1, y1, x2, y2,
            })
        }
    }
}

onload();


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