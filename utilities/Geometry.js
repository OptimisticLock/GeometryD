
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

    /** Calculates scalar product of two LineSegments:
     * https://www.mathsisfun.com/algebra/vectors-dot-product.html
     * a · b = |a| × |b| × cos(θ) = ax × bx + ay × by
     * @param that: Vector
     * @return {number} scalar product of the two vectors
     */
    scalarProductWith(that) {
        const a = this;
        const b = that;
        return  a.x * b.x + a.y * b.y;
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
     * @return boolean - true iff the two segments collide.
     * http://stackoverflow.com/a/565282/786339
     */
    collidesWith(that) {
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
        const rxs = r.scalarProductWith(s);             // r × s

        const t = qMinusP.scalarProductWith(s) / rxs;
        const u = qMinusP.scalarProductWith(r) / rxs;

        return (0 <= t && t <= 1   &&   0 <=u && u <= 1);

        // FIXME consider other cases!
    }
}

// true???
let segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
let segment2 = new LineSegment(new Point(0.00001, 0.0), new Point(5, 0));
let collides = segment1.collidesWith(segment2);
console.log("collides?", collides);


segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
segment2 = new LineSegment(new Point(1, 0.0), new Point(5, 0));
collides = segment1.collidesWith(segment2);
console.log("collides?", collides);


// true
segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
segment2 = new LineSegment(new Point(1, 0), new Point(1, 1));
collides = segment1.collidesWith(segment2);
console.log("collides?", collides);

// false
segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
segment2 = new LineSegment(new Point(5, 0), new Point(5, 1));
collides = segment1.collidesWith(segment2);
console.log("collides?", collides);

// True
segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
segment2 = new LineSegment(new Point(0.0, 0.0), new Point(5, 1));
collides = segment1.collidesWith(segment2);
console.log("collides?", collides);

