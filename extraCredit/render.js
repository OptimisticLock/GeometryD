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
            line.setAttribute("stroke", "yellow");
        } else {
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute("stroke", "black");
        }


        line.setAttribute("stroke-width", ".05");
        g.append(line);

        if (type === "Arc") {

            // TODO bad temp DRY violation

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

            let xC = x1;
            let yC = y2;

            let x0 = xC + r * Math.cos(0);
            let y0 = yC + r * Math.sin(0);

            for (let alpha = 0; alpha <= 2 * Math.PI; alpha += Math.PI / 16) {
                let x = xC + r * Math.cos(alpha);
                let y = yC + r * Math.sin(alpha);

                let lineA = document.createElementNS('http://www.w3.org/2000/svg','line');
                let lineB = document.createElementNS('http://www.w3.org/2000/svg','line');

                lineA.setAttribute("stroke", "red");
                lineA.setAttribute("stroke-width", .5);
                lineA.setAttribute('x1', x0);
                lineA.setAttribute('y1', y0);
                lineA.setAttribute('x2', x);
                lineA.setAttribute('y2', y);
                lineA.setAttribute("stroke-opacity", .1);
                g.append(lineA);
                x0 = x;
                y0 = y;


                lineB.setAttribute("stroke", "black");
                lineB.setAttribute("stroke-width", .1);
                lineB.setAttribute('x1', x);
                lineB.setAttribute('y1', y);
                lineB.setAttribute('x2', x2);
                lineB.setAttribute('y2', y2);
                lineB.setAttribute("stroke-opacity", .1);

            }

   //         let alpha = -Math.PI / 4; // 45 degrees

//            g.append(lineB);

        }
    }
}

onload();



