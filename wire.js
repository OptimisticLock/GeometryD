

class Edge {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
}

class Segment extends Edge {}
class QuarterCircleArc extends Edge {}

class Wire {

    // TODO verify that edges form a closed loop
    constructor(edges) {
        this.edges = edges;
    }
}


