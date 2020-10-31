
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
    constructor(previous, x, y, r = 1, isClockwise = true) {
        super(previous, x, y);
        this.r = r;
        this.clockwise = isClockwise;
    }

    static revive(obj) {
        return new Arc(obj.x, obj.y, obj.r, obj.clockwise);
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
}

// This would normally be in a static constructor.
Wire.addEdgeType("Arc", Arc);

