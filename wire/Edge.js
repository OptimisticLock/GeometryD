"use strict";

class Edge {

    //     static edgeTypes = {"Line" : Line, "Arc" : Arc};
    static edgeTypes = {}; //

    /**
     * A curve of an arbitrary shape in two-dimensional coordinate space. Currently, the only curves
     * supported are Line and Arc, but that can be extended by subclassing this class.
     *
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
     * Add a new edge type dynamically, e.g. Line and Arc. I wanted to allow this functionality
     * at the time, mostly just to see whether it can be  done in ES6; now I am not happy with
     * the overengineering and thinking of simplifying it back into the two usual, hard-coded edge types.
     * Except I do need to show something for the time spent! :-) Plus, it's an interesting pattern.
     *
     * @param edgeType : string - the name of the new edge type to be added, e.g. "EllipticArc"
     * @param edgeClass : Edge - a custom subclass of Edge for the new edge type, e.g. EllipticArc
     */
    static addEdgeType(edgeType, edgeClass) {
        this.edgeTypes[edgeType] = edgeClass;
    }

    /**
     * @return {String} - the type of the edge, e.g. "Line", "Arc".
     */
    getType() {
        return this.constructor.name;
    }

    /**
     * Serializes this edge into an array. I preferred it to the default JSON.stringify() for a number of reasons.
     * Subclasses may override if needed.
     * @return {Array}
     */
    serializeIntoArray() {
        return [this.getType(), this.x, this.y]
    }

    /**
     * Deserializes an Edge
     * @param type String edge type, e.g. "Line" or "Arc"
     * @param x - endpoint of the edge
     * @param y - endpoint of the edge
     * @param args - edge-specific args if any, e.g for Arc, radius and clockwise
     * @return {Edge} - the deserialized edge
     */
    static deserialize(type, x, y, ...args) {
        // edgeType is a reference to a class that is dynamically instantiated.
        // Currently, "Line" and "Arc" are suppo
        let edgeType = this.edgeTypes[type];

        check(edgeType, `Unknown edge type ${type}`);
        let edge = new edgeType(x, y, ...args);
        return edge;
    }


    /**
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
     * Checks whether this is a valid edge. If yes, does nothing. If not, throws error. Subclasses may override.
     * @return void
     */
    validate() {}

    /**
     * Discretizes a wire into a new wire with a given maximum linear deflection.
     * @param {Wire} discreteWire - the new wire being built, mustn't be closed
     * @param {number} deflection - maximum linear deflection
     */
    discretizeInto(discreteWire, deflection) {
        let line = new Line(this.x, this.y);
        discreteWire.addEdge(line);
    }

    /**
     * @param {Edge} that - the other edge
     * @return {null|Point} - the point of collision or null if none
     */
    collisionWith(that) {

        // TODO: allow to check collisions on non-Lines.
        const isImplemented = (this instanceof Line) && (that instanceof Line);
        check(isImplemented, "Only Line-Line collisions are detected at preset, use disretized wires as follows: \n    wire.discretize(deflection).getCollisions()")

        // FIXME: assuming that all segments are linear! Which is true for disretized wires..

        let thisSegment = new LineSegment(new Point(this.x0, this.y0), new Point(this.x, this.y));
        let thatSegment = new LineSegment(new Point(that.x0, that.y0), new Point(that.x, that.y));

        let collision = thisSegment.collisionWith(thatSegment);
        // if (collision)
        //     console.log("COLLISION", collision);

        return collision;
    }
}
