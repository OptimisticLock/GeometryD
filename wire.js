class Point {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

class Edge {
    static to(x, y) {
        throw new TypeError("Edge.to() is an abstract method and can't be called directly");
    }

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

/** A line segment */
class Line extends Edge {
    /**
     * @param x : number
     * @param y : number
     */

    static to(x, y) {
        return new Line(undefined, x, y); // TODO replace undefined
    }
}

/** A circular arc */
class Arc extends Edge {
    /**
     *
     * @param {Edge} previous - optional, previous edge at which the arc starts
     * @param {number} x - x the arc ends
     * @param {number} y - y where arc ends
     * @param {number} r - radius
     * @param {boolean} isClockwise - if true, arc is drawn clockwise
     */
    constructor(previous, x, y, r, isClockwise = true) {
        super(previous, x, y);
        this.r = r;
        this.clockwise = isClockwise;
    }

    static to(x, y, r) {
        return new Arc(undefined, x, y);
    }


    discretize(deflection) {

        // TODO assert rx === ry
        let r = this.x2 - this.x1;
    }
}

class Wire {


    /**
     * @param  {Array<Edge>} edges
     */

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

