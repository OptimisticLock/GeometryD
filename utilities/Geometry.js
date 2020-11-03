
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
     */
    collidesWith(that) {

    }

    length() {

        // TODO: see if we can get rid of sqrt; and not recalculate every time!
        return Math.sqrt((point.x - point0.x)**2 + (point.y - point0.y)**2);
    }

    /** Calculates scalar product of two LineSegments: a · b = |a| × |b| × cos(θ)
     * @param that : LineSegment
     */
    scalarProductWith(that) {
        const a = this.length() * that.length()
    }
}



