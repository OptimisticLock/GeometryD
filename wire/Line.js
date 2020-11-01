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

// TODO consider mixin syntax instead, like this:
// Wire.lineTo = function(x, y) {
//     const line = new Line(this.getLastEdge(), x, y);
//     return line
// }




