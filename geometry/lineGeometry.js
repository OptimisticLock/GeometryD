
function toDegrees(radians) {
    return radians * 360 / (2 * Math.PI);
}

function toRadians(degrees) {
    return degrees * 2 * Math.PI / 360;
}

// TODO: refactor other wire-agnostic geometry into this file.

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     *
     * @param that : Point the point to subtract
     * @return {Vector} Result
     */
    subtract(that) {
        return new Vector(this.x - that.x, this.y - that.y);
    }
}

class Vector extends Point {
    constructor(x, y) {
        super(x, y);
    }
    //
    // /** Calculates scalar product of two LineSegments:
    //  * https://www.mathsisfun.com/algebra/vectors-dot-product.html
    //  * a · b = |a| × |b| × cos(θ) = ax × bx + ay × by
    //  * @param that: Vector
    //  * @return {number} scalar product of the two vectors
    //  */
    // scalarProductWith(that) {
    //     const a = this;
    //     const b = that;
    //     return  a.x * b.x + a.y * b.y;
    // }

    /**
     * Calculates cross product of two 2D vectors
     * @param {Vector} that
     * @return {number} Cross product (scalar)
     */
    crossProductWith(that) {
        let a = this;
        let b = that;
        return a.x * b.y - a.y * b.x;
    }
}


class LineSegment {
    /**
     *
     * @param point0 : Point
     * @param point1 : Point
     */
    constructor(point0, point1) {
        this.point0 = point0;
        this.point1 = point1;
    }


    toVector() {
        return new Vector(this.point1.x - this.point0.x, this.point1.y - this.point0.y);
    }


    /**
     * @param other : LineSegment - a segment to test collision with.
     * @return Point - collision point between two segments, or null if none.
     * http://stackoverflow.com/a/565282/786339
     */
    intersectionWith(that) {
        // Not very fond of variable names, but keeping it consistent with the source
        const p = this.point0;
        const q = that.point0;

        const r = this.toVector();
        const s = that.toVector();

        // p and q are points
        // r and s are vectors
        // t and u are scalars

        // t = (q − p) × s / (r × s)
        // u = (q − p) × r / (r × s)

        const qMinusP = q.subtract(p);                  // q - p
        const rxs = r.crossProductWith(s);             // r × s

        // parallel or colinear line segments
        if (rxs === 0)
            return null; // FIXME these can still collide!

        const t = qMinusP.crossProductWith(s) / rxs;
        const u = qMinusP.crossProductWith(r) / rxs;

        if (0 <= t && t <= 1   &&   0 <=u && u <= 1)
            return new Point(p.x + t * r.x, p.y + t * r.y);
        else
            return null;

        // FIXME consider other cases!
    }
}

let segment1, segment2, collides;

// TODO. now Null always, need to handle colinear
segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
segment2 = new LineSegment(new Point(0, 0), new Point(1, 1));
collides = segment1.intersectionWith(segment2);
console.log("collision:", collides);


// Null
segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
segment2 = new LineSegment(new Point(0.00001, 0.0), new Point(5, 0));
collides = segment1.intersectionWith(segment2);
console.log("collision:", collides);

// Null
segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
segment2 = new LineSegment(new Point(1, 0.0), new Point(5, 0));
collides = segment1.intersectionWith(segment2);
console.log("collides?", collides);


// (1, 1)
segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
segment2 = new LineSegment(new Point(1, 0), new Point(1, 1));
collides = segment1.intersectionWith(segment2);
console.log("collision:", collides);

// Null
segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
segment2 = new LineSegment(new Point(5, 0), new Point(5, 1));
collides = segment1.intersectionWith(segment2);
console.log("collision:", collides);

// (0, 0)
segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
segment2 = new LineSegment(new Point(0.0, 0.0), new Point(5, 1));
collides = segment1.intersectionWith(segment2);
console.log("collision:", collides);


// (0, 0)
segment1 = new LineSegment(new Point(0, 0), new Point(0, 2));
segment2 = new LineSegment(new Point(-1, 0), new Point(1, 1));
collides = segment1.intersectionWith(segment2);
console.log("collision:", collides);
