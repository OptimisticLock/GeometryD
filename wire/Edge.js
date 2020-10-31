class Edge {
    // static to(x, y) {
    //     throw new TypeError("Edge.to() is an abstract method and can't be called directly");
    // }

    /**
     * An arbitrary curve in two-dimensional coordinate space. Currently, the only edges
     * supported are Line and Arc.
     *
     * @param {Edge}  previous - optional, previous edge at which this edge starts
     * @param {number} x
     * @param {number} y - point where this edge ends
     */
    constructor(previous, x, y) {
        this.previous = previous;
        this.x = x;
        this.y = y;



        // A workaround for the absence of abstract classes in JS. Alternatively, if (new.target === Edge)
        if (this.constructor === Edge)
            throw new TypeError("Edge is an abstract class and can't be instantiated directly");
    }

    /**
     * Returns the x coordinate of the beginning of the edge, or error if undefined.
     * @return {number} The x coordinate of the beginning of the edge.
     */
    get x0() {
        check(this.previous, "This edge's start point is unknown, probably because wire isn't closed yet");
        return this.previous.x;
    }

    /**
     * Returns the y coordinate of the beginning of the edge, or error if undefined.
     * @return {number} The y coordinate of the beginning of the edge.
     */
    get y0() {
        check(this.previous, "This edge's start point is unknown, probably because wire isn't closed yet");
        return this.previous.y;
    }

    /**
     * Checks whether this is a valid edge. Throws an error otherwise.
     * An edge that can be invalid should override this.
     * @return void
     */
    validate() {}


}

// edge.constructor.name