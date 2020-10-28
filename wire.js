class Edge {
    constructor(x0, y0, x1, y1) {
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
    }
}

class Line extends Edge {
}

class Arc extends Edge {
}

class Wire {

    // TODO verify that edges form a closed loop
    constructor(edges) {
        this.edges = edges;
    }
}


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


// wire.constructor.name

