class Edge {
    constructor(x0, y0, x1, y1) {
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
    }
}

class Line extends Edge {}

// Quarter circle arcs
class Arc extends Edge {}

class Wire {

    // TODO verify that edges form a closed loop; alternatively, remove redundancy.
    constructor(edges) {
        this.edges = edges;
    }

    serialize() {
        return JSON.stringify(this.edges);
    }

    static deserialize(str) {
        // TODO: handle errors
        let edges = JSON.parse(str);
        let wire = new Wire(edges);
        return wire;
    }
}



// wire.constructor.name

