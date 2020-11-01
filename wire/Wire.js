"use strict";

class Wire {

    edges = [];
    lastEdge = undefined;
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

    #getLastEdge() {
        return this.lastEdge;
    }

    serialize() {
        this.checkClosed();

        // An empty wire with no edges
        return JSON.stringify(this.edges, function (key, value) {
            return value instanceof Edge ? value.serializeIntoArray() : value;
        });
    }


    static deserialize(str) {

        function reviver(key, value) {

            if (Array.isArray(value) && key !== "") {
                let result = Edge.deserialize(...value);
         //       console.log("Array: ", key, value, result);
                return result;
            }
            else {
        //        console.log("Non-array: ", key, value)
                return value;
            }
        }

        // TODO: handle errors
        let edges = JSON.parse(str, reviver);

     //   console.log("????????????? Edges", edges);

        let wire = new Wire(); // TODO private constructor?

        for (let edge of edges)
            wire.addEdge(edge);

        wire.x = wire.lastEdge.x;
        wire.y = wire.lastEdge.y;
        wire.close();
        return wire;
    }

    /**
     * This is the only public way to instantiate a Wire.
     *
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
     *
     * @return {Wire} this, for fluent interface. TODO is it needed?
     */

    close() {
        let firstEdge = this.edges[0];

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
     * TODO Not validating that every parameter is defined and of the right type as a strictly-typed language with non-nullables should take care of that.
     *
     * @return void
     */
    validate() {
        this.checkClosed();

        for (let edge of this.edges)
            edge.validate();
    }

    discretize(deflection) {
        check (deflection > 0, "Deflection must be positive")

        this.checkClosed();
        let discreteWire = Wire.startAt(this.x, this.y);

        for (let edge of this.edges)
            edge.discretizeInto(discreteWire, deflection);

        discreteWire.close();
        return discreteWire;
    }
}



