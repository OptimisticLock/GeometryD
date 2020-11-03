"use strict";

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
        const dx = this.x - this.x0;
        const dy = this.y - this.y0;
        const minDiameter = Math.sqrt(dx ** 2 + dy ** 2);

        // TODO: is this right?
        const r = (minDiameter/2 + .01).toFixed(2);

        check(this.radius * 2 >= minDiameter, `Arc radius ${this.radius} too small to connect points (${this.x0}, ${this.y0}) and (${this.x}, ${this.y}). Must be at least ${r}`)
    }

    /**
     *
     * @param deflection
     * @param radius
     * @return {number}
     * TODO: this uses inscribed polygon, but inscribed polygon doesn't provide the lowest maximum deflection!
     * As can be easily visualized by inscribing an isosceles triangle into a circle.
     * Technically, this meets requirement #4, albeit suboptimally, by creating too many chords.
     */
    getAngleIncrement(deflection) {

        let result = 2 * Math.acos(1 - deflection / this.radius);

        if (!this.clockwise)
            result = -result;

//        console.log(`Angle increment for radius ${this.radius} and deflection ${deflection} is ${toDegrees(result)}`);
        return result;
    }

// http://mathforum.org/library/drmath/view/53027.html#:~:text=You%20do%20this%20just%20by,is%20just%20half%20of%20q.

    /**
     * Calculates the center of the arc
     * @return {[x, y]} - coordinates of the center.
     */
    getCenter() {

        let x = this.x;
        let y = this.y;
        let x0 = this.x0;
        let y0 = this.y0;
        let radius = this.radius;

        // Midpoint between (x, y) and (x0, y0)
        let x3 = (x + x0)/2;
        let y3 = (y + y0)/2;

        // The distance between points 1 and 2.  We'll
        let q =  Math.sqrt((x - x0)**2 + (y - y0)**2);

        if (this.clockwise) {
            let xa = x3 + Math.sqrt(radius**2 - (q/2)**2) * (y0 - y)/q;
            let ya = y3 + Math.sqrt(radius**2 - (q/2)**2) * (x - x0)/q;
            return [xa, ya];
        }
        else { // TODO un-DRY
            let xb = x3 - Math.sqrt(radius**2 - (q/2)**2) * (y0 - y)/q;
            let yb = y3 - Math.sqrt(radius**2 - (q/2)**2) * (x - x0)/q;
            return [xb, yb];
        }
    }

    /**
     * Calculates the angle to the horizon of a line connecting (x1, y1) and (x2, y2)
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @return {number} angle
     */
    static angle(x1, y1, x2, y2) {
        let dx = x2 - x1;
        let dy = y2 - y1;
        let angle = Math.atan2(dy, dx);
        return angle;
    }

    // TODO: at very low deflection, the result can be very a very long array. Replace it with
    //  an iterator. A generator function perhaps?
    /**
     * Discretizes wire into another wire. A discrete wire is one consisting of lines only.
     * @param wire - a target wire to discretize this edge into. I am trying to make wires as
     * unmutable as possible
     *
     * @param deflection - maximum linear deflection (TODO add definition)
     */

    discretizeInto(wire, deflection) {

        const [xC, yC] = this.getCenter();

        const alpha0 = Arc.angle(xC, yC, this.x0, this.y0);
        let alpha = Arc.angle(xC, yC, this.x, this.y);

        if (this.clockwise && alpha < alpha0)
            alpha += 2 * Math.PI;

        if (!this.clockwise && alpha > alpha0)
            alpha -= 2 * Math.PI;

 //       console.log("##### Angles: ", toDegrees(alpha0), toDegrees(alpha), this.clockwise);

        let angleIncrement = this.getAngleIncrement(deflection);

        // TODO fix the DRY violation
        if (angleIncrement > 0)
            for (let alphai = alpha0 + angleIncrement; alphai <= alpha; alphai += angleIncrement) {
                const xi = xC + this.radius * Math.cos(alphai);
                const yi = yC + this.radius * Math.sin(alphai);
                wire.addEdge(new Line(xi, yi));
            }
        else
            for (let alphai = alpha0 + angleIncrement; alphai >= alpha; alphai += angleIncrement) {
                const xi = xC + this.radius * Math.cos(alphai);
                const yi = yC + this.radius * Math.sin(alphai);
                wire.addEdge(new Line(xi, yi));
            }
        wire.addEdge(new Line(this.x, this.y));
    }

    /**
     * Serializes an arc into an array.
     * @return {Array<any>} A serialized representation of this arc
     */
    serializeIntoArray() {
        return [...super.serializeIntoArray(), this.radius, this.clockwise];
    }

}

// Register Arc with parent class so that it knows to instantiate arcs dynamically. Seemed like a good
// idea at the time. Now, I am debating removing this altogether.

// The ES6 equivalent of a static constructor.
Edge.addEdgeType("Arc", Arc);
