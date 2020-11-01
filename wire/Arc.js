
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
    constructor(x, y, r = 1, isClockwise = true) {
        super(x, y);
        this.r = r;
        this.clockwise = isClockwise;
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
        check (this.r * 2 >= minDiameter, `Arc radius ${this.r} too small to connect points (${this.x0}, ${this.y0}) and (${this.x}, ${this.y})`)
    }

    discretize(deflection) {

        // TODO assert rx === ry
        let r = this.x2 - this.x1;
    }

    // @override
    serializeIntoArray() {
        return [...super.serializeIntoArray(), this.r, this.clockwise];
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
