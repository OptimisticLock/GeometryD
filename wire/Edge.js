class Edge {

    /**
     *
     * @type {Edge}  The edge preceding this one in the wire. TODO: encapsulate everything to make Edges as
     * immutable as possible. Make sure the same edge isn't shared between multiple wires
     */
    previous = undefined;

    /**
     * Sets previous edge. Users shouldn't call this directly. TODO: see if this can be made private
     * @param previous : Edge
     */
    set previous(previous) {
        check(this.prev === undefined, "Previous already set. Can't reuse an edge, instantiate a new one instead");
        this.prev = previous;
    }

    /**
     * An arbitrary curve in two-dimensional coordinate space. Currently, the only edges
     * supported are Line and Arc.
     *
     * @param {Edge}  previous - optional, previous edge at which this edge starts
     * @param {number} x
     * @param {number} y - point where this edge ends
     */
    constructor(x, y) {

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
        check(this.previous, "This edge's start point is unknown, probably because the edge hasn't been added to a wire or wire hasn't been closed yet");
        return this.previous.x;
    }

    /**
     * Returns the y coordinate of the beginning of the edge, or error if undefined.
     * @return {number} The y coordinate of the beginning of the edge.
     */
    get y0() {
        check(this.previous, "This edge's start point is unknown, probably because the edge hasn't been added to a wire or wire hasn't been closed yet");
        return this.previous.y;
    }

    /**
     * Checks whether this is a valid edge. Throws an error otherwise.
     * @return void
     */
    validate() {}
}
