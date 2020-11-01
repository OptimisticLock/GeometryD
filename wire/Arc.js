
/** A circular arc */
class Arc extends Edge {
    /**
     ** @param {number} x - x the arc ends
     * @param {number} y - y where arc ends
     * @param {number} radius - radius
     * @param {boolean} isClockwise - if true, arc is drawn clockwise
     */
    constructor(x, y, radius = 1, clockwise = true) {
        super(x, y);
        this.radius = radius;
        this.clockwise = clockwise;
    }

    /**
     * Checks whether this is a valid arc. Throws an error otherise
     * An arc is valid if its radius is big enough to connect the points
     * @return void
     * @override
     */
    validate() {
        check(this.previous, "Can't validate without knowing the previous edge");
        let dx = this.x - this.x0;
        let dy = this.y - this.y0;
        let minDiameter = Math.sqrt(dx**2 + dy**2);
        check (this.radius * 2 >= minDiameter, `Arc radius ${this.radius} too small to connect points (${this.x0}, ${this.y0}) and (${this.x}, ${this.y})`)
    }

    discretize(deflection) {

        // TODO assert rx === ry
        let radius = this.x2 - this.x1;
    }

    // @override
    serializeIntoArray() {
        return [...super.serializeIntoArray(), this.radius, this.clockwise];
    }

    // /**
    //  *
    //  * @return {string} Serialized object
    //  * @override
    //  */
    // serialize() {
    //     let obj = [this.constructor.name, this.x, this.y, this.r, this.clockwise]
    //     return JSON.stringify(obj);
    // }
}

// This would normally be in a static constructor.
Edge.addEdgeType("Arc", Arc);
