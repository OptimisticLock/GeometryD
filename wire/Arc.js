
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
    constructor(x, y, r, isClockwise = true) {
        super(x, y);
        this.r = r;
        this.clockwise = isClockwise;
    }

    static to(x, y, r) {
        return new Arc(undefined, x, y);
    }


    discretize(deflection) {

        // TODO assert rx === ry
        let r = this.x2 - this.x1;
    }
}

