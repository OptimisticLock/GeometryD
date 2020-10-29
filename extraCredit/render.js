

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
            let params = `M ${x1} ${y1}  A ${r} ${r}   0 0 1  ${x2} ${y2}`;
            console.log("params", params);

            // Add the actual arc
            addElement("path", {
                d: params,
            })

            //arc2
            let params2 = `M ${x2} ${y2}  A ${r} ${r}   0 0 1   ${x1} ${y1}`;
            console.log("params", params2);

            let xC = x1;
            let yC = y2;

            // TODO: optimize trigonometric functions.

            let x0 = xC + r * Math.cos(0);
            let y0 = yC + r * Math.sin(0);

            let xMidpoint = (x1 + x2) / 2;
            let yMidpoint = (y1 + y2) / 2;


            let chordLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
 //           let alpha0 = Math.asin(chordLength / (2 * r));

            let alpha0 = 0;
            let alpha1 = toRadians(5);

            for (let alpha = alpha0; alpha <= alpha1; alpha += 2 * Math.PI / 100) {
                let x = xC + r * Math.cos(alpha) * Math.sign(x2 - x1);
                let y = yC + r * Math.sin(alpha) * Math.sign(y2 - y1);

                // Add daisy-shaped rays for debugging
                addElement("line", {
                    class: "ray",
                    x1: xC, y1: yC,
                    x2: x, y2: y,
                });

                x0 = x;
                y0 = y;

                // lineB.setAttribute("stroke", "black");
                // lineB.setAttribute("stroke-width", .1);
                // lineB.setAttribute('x1', x);
                // lineB.setAttribute('y1', y);
                // lineB.setAttribute('x2', x2);
                // lineB.setAttribute('y2', y2);
                // lineB.setAttribute("stroke-opacity", .1);

            }

            //         let alpha = -Math.PI / 4; // 45 degrees

//            g.append(lineB);


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