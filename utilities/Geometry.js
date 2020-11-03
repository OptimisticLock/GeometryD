
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
}

class Vector extends Point {
    constructor(x, y) {
        super(x, y);
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

    /**
     * @param other : LineSegment - a segment to test collision with.
     * @return boolean - true iff the two segments collide.
     * http://stackoverflow.com/a/565282/786339
     */
    collidesWith(that) {

    }

    toVector() {
        return new Vector(this.point1.x - this.point0.x, this.point1.y - this.point0.y);
    }


    /** Calculates scalar product of two LineSegments:
     * https://www.mathsisfun.com/algebra/vectors-dot-product.html
     * a · b = |a| × |b| × cos(θ) = ax × bx + ay × by
     * @param that : LineSegment
     */
    scalarProductWith(that) {
        const a = this.toVector();
        const b = that.toVector();
        const result = a.x * b.x + a.y * b.y;
    }
}



