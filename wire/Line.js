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
}
// This would normally be in a static constructor.
Edge.addEdgeType("Line", Line);

// My first thought was, as below. Ruled against it because of the lack of autocomplete.
// Wire.lineTo = function(x, y) {
//     const line = new Line(this.getLastEdge(), x, y);
//     return line
// }




