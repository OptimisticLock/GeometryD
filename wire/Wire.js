class Wire {

    edges = [];
    lastEdge = undefined;
    isClosed = false;

    // This is designed for easy future addition of new edge types
    // Could just do static edgeTypes = {Line, Arc}, but eating own dog food instead,
    // letting Line and Arc register themselves.
    static edgeTypes = {};

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

    #getLastEdge () {
        return this.lastEdge;
    }

    serialize() {
        this.checkClosed();

       function replacer(key, value) {console.log("Serializing", key, value); return value}

        let first = this.edges[0];

        if (first) {
            // Remove circular dependencies before we can call JSON.stringify().
            // FIXME. Not thread-safe. Not safe, period.
            let tmp = first.previous;
            first.previous = undefined;
            let result = JSON.stringify(this.edges, replacer, " ");
            first.previous = tmp;
            return result;
        }

        // An empty wire with no edges
        return JSON.stringify(this.edges, replacer, " ");
    }

    static deserialize(str) {
        // TODO: handle errors
        let edges = JSON.parse(str);
        let wire = new Wire(edges);
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
     * @param edgeTypeName : string - type of edge. Currently, "Line" and "Arc" are
     * the supported values, but provisions are made to support additional types.
     * #TODO test that at least some.
     *
     * The first edge begins at coordinates defined by `Wire.startAt(x, y)`.
     * Subsequent edges begin at the end of the wire's previous edge.
     *
     * @param x : number
     * @param y : number - destination point where the edge ends
     * @param args - additional arguments required for the given edge type.
     *    For Line, none.
     *    For Arc, optional radius:number=1 and clockwise:Boolean=true.
     *
     * @return {Wire} - `this`, to allow for fluent interface.
     */

    add(edgeTypeName, x, y, ...args) {

        check(!this.isClosed, "Can't add edge to a closed wire");

        // edgeType is a reference to a class that is dynamically instantiated.
        // Currently, "Line" and "Arc" are supported
        let edgeType = Wire.edgeTypes[edgeTypeName];

        check (edgeType, `Unknown edge type ${edgeTypeName}`);

        let edge = new edgeType(this.lastEdge, x, y, ...args);
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
            this.add("Line", this.x, this.y);

        firstEdge.previous = this.lastEdge;
        this.isClosed = true;
        return this;
    }

    /**
     * Checks whether the wire is closed
     */
    checkClosed() {
        check(this.isClosed, "Use Wire.close() to close the wire");
    }

    /**
     * Add a new edge type, such as Line and Arc. Experimental. Use at your own risk.
     * FIXME Do we want it public?
     *
     * @param edgeType : string - the name of the new edge type to be added, e.g. "EllipticArc"
     * @param edgeClass : Edge - a custom subclass of Edge for the new edge type, e.g. EllipticArc
     */
    static addEdgeType(edgeType, edgeClass) {
        this.edgeTypes[edgeType] = edgeClass;
    }
}

