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
    ["Line", 10, 4, 10, 6],
    ["Arc", 6, 10, 10, 6],
    // ["Line", 0, 0, 1, 1],
]);


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
let wire = Wire.deserialize(roundest.serialize())

function onload() {
    let g = document.getElementById("g");

    for (const [type, x1, y1, x2, y2] of wire.edges) {

        // TODO check namespace url
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        line.setAttribute('x1',x1);
        line.setAttribute('y1',y1);

        if (type === "Arc") {
            line.setAttribute('x2', x1 - .5);
            line.setAttribute('y2', y1 - .5);
            line.setAttribute("stroke", "red");
        } else {
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute("stroke", "black");
        }


        line.setAttribute("stroke-width", ".05");
        g.append(line);

        let x0, y0;

        if (type === "Arc") {

            let arc = document.createElementNS('http://www.w3.org/2000/svg','path');

            // TODO assert ry === rx. Circle, not ellipse.
            const r = Math.abs(x2 - x1);

            let isClockwise = x2 - x1
            let params = `M ${x1} ${y1}  A ${r} ${r}   0 0 1   ${x2} ${y2}`;
            console.log("params", params);
            arc.setAttribute('d', params);
            arc.setAttribute("stroke", "green");
            arc.setAttribute("stroke-width", .1);
            arc.setAttribute("fill-opacity", 0);
            g.append(arc);


            let arc2 = document.createElementNS('http://www.w3.org/2000/svg','path');
            let params2 = `M ${x2} ${y2}  A ${r} ${r}   0 0 1   ${x1} ${y1}`;
            console.log("params", params2);
            arc2.setAttribute('d', params2);
            arc2.setAttribute("stroke", "blue");
            arc2.setAttribute("stroke-width", .1);
            arc2.setAttribute("fill-opacity", 0);
            g.append(arc2);
        }
    }
}

onload();



