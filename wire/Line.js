"use strict";
/** An Edge that is a line segment */
class Line extends Edge {
    /**
     * @param x : number
     * @param y : number
     */
    constructor(x, y) {
        super(x, y);
    }

    collisionWith(that) {
        let thisSegment = new LineSegment(new Point(this.x0, this.y0), new Point(this.x, this.y));
        let thatSegment = new LineSegment(new Point(that.x, that.y), new Point(that.x, that.y));

        let intersection = segment1.collisionWith(segment2);
        console.log("collision:", collides);
    }
}
// This would normally be in a static constructor.
Edge.addEdgeType("Line", Line);

// My first thought was, as below. Ruled against it because of the lack of autocomplete.
// Wire.lineTo = function(x, y) {
//     const line = new Line(this.getLastEdge(), x, y);
//     return line
// }





