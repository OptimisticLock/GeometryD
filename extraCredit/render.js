console.log("render.js");

let rounder = new Wire([
    ["Line", 0, 3, 0, 7],
    ["Arc", 0, 3, 3, 0],
    ["Line", 3, 0, 7, 0],
    ["Arc", 0, 7, 3, 10],
    ["Line", 3, 10, 7, 10],
    ["Arc", 7, 0, 10, 3],
    ["Line", 10, 3, 10, 7],
    ["Arc", 7, 10, 10, 7],
    // ["Line", 0, 0, 1, 1],
]);

let roundest = new Wire([
    ["Line", 0, 4, 0, 6],
    ["Arc", 0, 4, 4, 0],
    ["Line", 4, 0, 6, 0],
    ["Arc", 0, 6, 4, 10],
    ["Line", 4, 10, 6, 10],
    ["Arc", 6, 0, 10, 4],
    ["Line", 10, 4, 10, 6],  //
    ["Arc", 6, 10, 10, 6],
    // ["Line", 0, 0, 1, 1],
]);

// TODO ask about input
// TODO: that assumes input is ordered clockwise.

let reordered = new Wire([
    ["Line", 0, 6, 0, 4],
    ["Arc", 0, 4, 4, 0],
    ["Line", 4, 0, 6, 0],
    ["Arc", 6, 0, 10, 4],
    ["Line", 10, 4, 10, 6],
    ["Arc", 10, 6, 6, 10],
    ["Line", 6, 10, 4, 10],
    ["Arc", 4, 10, 0, 6],


    // ["Line", 0, 0, 1, 1],
]);

let partial = new Wire([
    // ["Line", 0, 4, 0, 6],
    // ["Arc", 0, 4, 4, 0],
    // ["Line", 4, 0, 6, 0],
    ["Arc", 0, 6, 4, 10],
    // ["Line", 4, 10, 6, 10],
    // ["Arc", 6, 0, 10, 4],
    // ["Line", 10, 4, 10, 6],
    // ["Arc", 6, 10, 10, 6],
    // ["Line", 0, 0, 1, 1],
]);

// TODO is fillet what I think it is?
// TODO const
// TODO Typescript?

let wire0 = new Wire([
    ["Line", 0, 1, 0, 9],
    ["Arc", 0, 1, 1, 0],
    ["Line", 1, 0, 9, 0],
    ["Arc", 0, 9, 1, 10],
    ["Line", 1, 10, 9, 10],
    ["Arc", 9, 0, 10, 1],
    ["Line", 10, 1, 10, 9],
    ["Arc", 9, 10, 10, 9],
    // ["Line", 0, 0, 1, 1],
]);

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
            addElement("line", {
                x1,
                y1,
                x2: x1 - .5,
                y2: y1 - .5,
                stroke: "lightgray",
                "stroke-width": .2,
            })

            // TODO assert ry === rx. Circle, not ellipse.
            const r = Math.abs(x2 - x1);
        //    let arc = Math.sign((x2 - x1) || (y2 - y1));
            let params = `M ${x1} ${y1}  A ${r} ${r}   0 0 1  ${x2} ${y2}`;
            console.log("params", params);

            addElement("path", {
                d: params,
                stroke: "green",
                "stroke-width": .1,
                "fill-opacity": 0,
            })

            //arc2
            let params2 = `M ${x2} ${y2}  A ${r} ${r}   0 0 1   ${x1} ${y1}`;
            console.log("params", params2);

            // addElement("path", {
            //     d: params2,
            //     stroke: "blue",
            //     "stroke-width": .1,
            //     "fill-opacity": 0,
            // });


            let xC = x1;
            let yC = y2;

            // TODO: optimize sin etc.

            let x0 = xC + r * Math.cos(0);
            let y0 = yC + r * Math.sin(0);

            let xMidpoint = (x1 + x2) / 2;
            let yMidpoint = (y1 + y2) / 2;


            let chordLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            let alpha0 = Math.asin(chordLength / (2 * r));

            for (let alpha = alpha0; alpha <= alpha0 + Math.PI / 6; alpha += Math.PI / 16) {
                let x = xC + r * Math.cos(alpha) * Math.sign(x2 - x1);
                let y = yC - r * Math.sin(alpha) * Math.sign(y2 - y1);

                // lineA
                addElement("line", {
                    stroke: "red",
                    "stroke-width": .5,
                    x1: xC,
                    y1: yC,
                    x2: x,
                    y2: y,
                    "stroke-opacity": .1,
                });

                // lineB
                //              addElement("line", {});

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
            addElement("line", {
                x1, y1, x2, y2,
                stroke: "blue",
                "stroke-width": .05

            })
        }
    }
}

onload();


function toGrad(rad) {
    return rad * 360 / (2 * Math.PI);
}

let svg = document.getElementById("svg");
let pt = svg.createSVGPoint();  // Created once for document

g.addEventListener('mousemove', evt => {
    console.log("evt", evt);
// //    let element = evt.target;
//     let element = g;
//     console.log(element);
//     var dim = element.getBoundingClientRect();
//     var x = evt.clientX - dim.left;
//     var y = evt.clientY - dim.top;
//     console.log ("x: " + x + " y: " + y);
//

        pt.x = evt.clientX;
        pt.y = evt.clientY;

        // The cursor point, translated into svg coordinates
        let cursorPoint =  pt.matrixTransform(g.getScreenCTM().inverse());
        console.log("cursorPoint", cursorPoint);
        let coords = "(" + cursorPoint.x.toFixed(2) + ", " + cursorPoint.y.toFixed(2) + ")";

        document.getElementById("coords").innerText = coords;
});