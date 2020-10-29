

# Computational Geometry Challenge Solution

This challenge is to implement a heavily simplified form of some 2D
boundary-representation geometry data structures and algorithms, as described [here](GeometryTakeHome.md).


### Obstacles. 

I am not familiar with graphic libraries, so I had to build a rudimentary SVG-based one. Learning SVG took most of the assignment time. (That, and a refresher on trigonometry.) 

### TODO

1. The code needs major refactoring. Everything lives at the presentation layer.

2. I assume input needs to be heavily sanity-checked, given the nature of real life challenges faced by the company.

3. Assumptions regarding the input need to be verified.




### Assumptions.

1. All arcs are 90 degrees and start and end at 90 * n degrees angles.

### Latest SVG renderer snapshot
This will change as I work on the project. Stay tuned.  

Currently, working on item #4 of the challenge. Red chords are lines, approximating the arcs. At this point, they do so with arbitrary precision.
![Snapshot](svg/snapshot.png)

