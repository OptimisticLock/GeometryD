/**
 * I am undecided whether I want to Points or [x, y] numbers. They clutter code in
 * different ways. In a language with operator overloading and implicit
 * conversions, I would have gone more OO.
 */

class Point {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}