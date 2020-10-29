console.log("render.js");

let wire = new Wire([
    ["Line", 0, 1, 0, 9],
    ["Arc", 0, 1, 1, 0],
    ["Line", 1, 0, 9, 0],
    ["Arc", 0, 9, 1, 10],
    ["Line", 1, 10, 9, 10],
    ["Arc", 9, 0, 10, 1],
    ["Line", 10, 1, 10, 9],
    ["Arc", 9, 10, 10, 9]
]);

function onload() {
    let g = document.getElementById("g");

// TODO check namespace url
    let newLine = document.createElementNS('http://www.w3.org/2000/svg','line');

    newLine.setAttribute('id','line2');
    newLine.setAttribute('x1','0');
    newLine.setAttribute('y1','0');
    newLine.setAttribute('x2','10');
    newLine.setAttribute('y2','3');
    newLine.setAttribute("stroke", "black")
    g.append(newLine);

}

onload();



