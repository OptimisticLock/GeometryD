"use strict";

class Wire {

    edges = [];
    lastEdge = undefined;

    /**
     * Some operations are only allowed on closed wires; others, only on open ones (i.e. still being built).
     * Once closed, a wire should be as immutable as the language allows. Prevents lots of bugs.
     *
     * @type {boolean}
     */
    isClosed = false;

    /**
     * A private constructor. Use Wire.startAt() to instantiate.
     * @param  {number} x - starting point x
     * @param  {number} y - starting point y
     * FIXME: Make it private. Adding # throws "Class constructor may not be a private method"
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Serializes this wire into a string containing json.
     * @return {string}
     */
    serialize() {
        this.checkClosed();

        return JSON.stringify(this.edges, function (key, value) {
            return value instanceof Edge ? value.serializeIntoArray() : value;
        });
    }


    /**
     * Deserializes a wire from a string containing json.
     * @param {String} str - json to deserialize
     * @return {Wire}
     */
    static deserialize(str) {

        // Massaging JSON.parse() a bit to make it more concise and fit into the rest of the code better.
        const reviver = (key, value) => Array.isArray(value) && key !== "" ? Edge.deserialize(...value) : value;

        // This throws Error if JSON is malformed, with a reasonably good text message, so we are good.
        const edges = JSON.parse(str, reviver);

        const wire = new Wire(undefined, undefined);

        for (let edge of edges)
            wire.addEdge(edge);

        wire.x = wire.lastEdge.x;
        wire.y = wire.lastEdge.y;

        // This also validates the wire.
        wire.close();
        return wire;
    }

    /**
     * This should be the only public way to instantiate a Wire.
     * @param x
     * @param y - point at which the wire's first edge starts.
     * @return {Wire}
     */
    static startAt(x, y) {
        return new Wire(x, y);
    }

    /**
     * Add an edge to a wire. The wire must not be closed.
     *
     * The first edge begins at coordinates defined by `Wire.startAt(x, y)`.
     * Subsequent edges begin at the end of the wire's previous edge.
     *
     * @param  {Edge} edge - edge to add
     * @return {Wire} - `this`, to allow for fluent interface.
     */

    addEdge(edge) {

        check(!this.isClosed, "Can't add edge to a closed wire");
        edge.previous = this.lastEdge;
        this.edges.push(edge);
        this.lastEdge = edge;
        return this;
    }

    /**
     * Closes the wire. Once closed, a wire is immutable. TODO: verify that.
     *
     * This method is to be called after all edges (except possibly the last)
     * have been added to the wire. If the last edge hasn't been added, i.e
     * the wire starts and ends at different coordinates, adds a closing Line
     * to fix that. // TODO: or throw an error for more redundancy?
     *
     * Some operations, such as serialization, aren't allowed on open wires and
     * throw an error. TODO: I can think of reasons to serialize and open wire
     *
     * @return {Wire} this, for fluent interface.
     */

    close() {
        const firstEdge = this.edges[0];

        check(!this.isClosed, "Wire already closed");

        // TODO: add other checks as needed
        check(firstEdge, "Can't close an empty wire");

        assert(!firstEdge.previous, "firstEdge can't have 'previous' yet");

        // Add a closing line if needed. TODO: consider throwing an error instead
        if (this.lastEdge.x !== this.x || this.lastEdge.y !== this.y)
            this.addEdge(new Line(this.x, this.y));

        firstEdge.previous = this.lastEdge;
        this.isClosed = true;
        this.validate();
        return this;
    }

    /**
     * Checks whether the wire is closed
     */
    checkClosed() {
        check(this.isClosed, "Use Wire.close() to close the wire");
    }

    /**
     * Check whether this is a valid wire, throw an error otherwise.
     *
     * A wire is valid if it's closed, non-empty and all its edges are valid. Though
     * one can add more checks as needed, e.g. to make sure it's not one-dimensional.
     * TODO Add more checks
     * @return void
     */
    validate() {
        this.checkClosed();

        for (let edge of this.edges)
            edge.validate();
    }

    discretize(deflection) {
        check(deflection > 0, "Deflection must be positive")

        this.checkClosed();
        let discreteWire = Wire.startAt(this.x, this.y);

        for (let edge of this.edges)
            edge.discretizeInto(discreteWire, deflection);

        discreteWire.close();
        return discreteWire;
    }

    /**
     * Check the wire for collisions. TODO: this is O(n^2, not good!
     * @return {Array<Point>} Collision points, if any
     */
    getCollisions() {

        let collisions = [];


        for (let e1 = 0; e1 < this.edges.length; e1++) {
            let edge1 = this.edges[e1];

            // TODO: `+ 2` means we aren't checking adjacent edges. But they'll become important for non-linear edges
            for (let e2 = e1 + 2; e2 < this.edges.length; e2++) {

                let edge2 = this.edges[e2];
                if (edge2.getType() === "Line") {
                    console.log(`edge1: #${e1} from ${edge1.x0}, ${edge1.y0} to ${edge1.x}, ${edge1.y}`);
                    console.log(`edge2: #${e2} from ${edge2.x0}, ${edge2.y0} to ${edge2.x}, ${edge2.y}\n`);

                    if (e1 === 0 && e2 === 4)
                        console.log("Here");

                }


                const collision = edge1.collisionWith(edge2);

                if (collision)
                    collisions.push(collision)
            }
        }

        return collisions;
    }

    isSimplePolygon() {
        let collisions = this.getCollisions();
        return collisions.length === 0;
    }
}



