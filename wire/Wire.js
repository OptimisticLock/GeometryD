class Wire {

    edges = [];
    lastEdge = undefined;
    isClosed = false;

    // This is designed for easy future addition of new edge types
    edgeTypes = {Line, Arc};

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
        return JSON.stringify(this.edges);
    }

    static deserialize(str) {
        // TODO: handle errors
        let edges = JSON.parse(str);
        let wire = new Wire(edges);
        return wire;
    }

    /**
     * This is the only public way to instantiate a Wire.
     * Edges can be subsequently added using fluent interface.
     *
     * @param x
     * @param y
     * @return {Wire}
     */
    static startAt(x, y) {
        return new Wire(x, y);
    }

    add(edgeTypeName, x, y, ...args) {

        let edgeType = this.edgeTypes[edgeTypeName];
        let edge = new edgeType(this.lastEdge, x, y, ...args);
        this.edges.push(edge);
        return this;
    }

    close() {
        let firstEdge = this.edges[0];

        check(!isClosed, "Wire already closed");

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
        check(isClosed, "Use Wire.close() to close the wire");
    }
}


