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
        let minDiameter = Math.sqrt(dx ** 2 + dy ** 2);
        check(this.radius * 2 >= minDiameter, `Arc radius ${this.radius} too small to connect points (${this.x0}, ${this.y0}) and (${this.x}, ${this.y})`)
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
    getChordAngle(deflection) {
        //   return toRadians(30);
        // TODO verify partial curves, especially sharp angles

        let result = 2 * Math.acos(1 - deflection / this.radius);
        console.log(`Step for radius ${this.radius} and deflection ${deflection} is ${toDegrees(result)}`);
        return result;
    }




// http://mathforum.org/library/drmath/view/53027.html#:~:text=You%20do%20this%20just%20by,is%20just%20half%20of%20q.
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
     * Calculates the angle to the horizon of a line connexting (x1, y1) and (x2, y2)
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


    discretize(deflection) {
        let result = [];

        let [xC, yC] = this.getCenter();

        let alpha0 = Arc.angle(xC, yC, x0, y0);
        let alpha = Arc.angle(xC, yC, x, y);

        if (this.clockwise && alpha < alpha0)
            alpha += 2 * Math.PI;

        if (!this.clockwise && alpha > alpha0)
            alpha -= 2 * Math.PI;

        if (alpha0 > alpha)
            [alpha0, alpha] = [alpha, alpha0];

        let chordAngle = this.getChordAngle(deflection);


        for (let alphai = alpha0; alphai <= alpha; alphai += chordAngle) {

            let xi = xC + this.radius * Math.cos(alphai);
            let yi = yC + this.radius * Math.sin(alphai);

            result.push(new Line(xi, yi));
            //
            // xPrev = xi;
            // yPrev = yi;
        }
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
