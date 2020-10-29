class Edge {
    constructor(x1, y1, x2, y2) {
        this.x0 = x1;
        this.y0 = y1;
        this.x1 = x2;
        this.y1 = y2;
    }
}

class Line extends Edge {}

// Quarter circle arcs
class Arc extends Edge {
    discretize(deflection) {

        // TODO assert rx === ry
        let r = this.x2 - this.x1;

    }
}

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

