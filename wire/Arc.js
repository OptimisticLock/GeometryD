
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

    discretize(deflection) {

        // TODO assert rx === ry
        let r = this.x2 - this.x1;
    }
}

// This would normally be in a static constructor.
Wire.addEdgeType("Arc", Arc);

