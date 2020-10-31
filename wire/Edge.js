class Edge {
    // static to(x, y) {
    //     throw new TypeError("Edge.to() is an abstract method and can't be called directly");
    // }

    /**
     * An arbitrary curve in two-dimensional coordinate space. Currently, the only edges
     * supported are Line and Arc.
     *
     * @param {Edge}  previous - optional, previous edge at which this edge starts
     * @param {Point} to - pint where this edge ends
     */
    constructor(previous, x, y) {
        this.previous = previous;
        this.to = ne

        // A workaround for the absence of abstract classes in JS. Alternatively, if (new.target === Edge)
        if (this.constructor === Edge)
            throw new TypeError("Edge is an abstract class and can't be instantiated directly");
    }
}

// edge.constructor.name