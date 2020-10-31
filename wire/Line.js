/** An Edge that is a line segment */
class Line extends Edge {
    /**
     * @param previous: Edge optional
     * @param x : number
     * @param y : number
     */
    constructor(previous, x, y) {
        super(previous, x, y);
    }
}
// This would normally be in a static constructor.
Wire.addEdgeType(Line);


// TODO consider mixin syntax instead, like this:
// Wire.lineTo = function(x, y) {
//     const line = new Line(this.getLastEdge(), x, y);
//     return line
// }


