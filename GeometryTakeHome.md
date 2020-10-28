# Computational Geometry Challenge

In this challenge, you will implement a heavily simplified form of some 2D
boundary-representation geometry data structures and algorithms. 

You may solve the challenge using any language of your choice.

For serialization or other non-geometry logic, you may use any publicly-available third
party dependencies that are header-only or can be installed through standard package managers,
but you should **NOT** use any such dependencies for your core geometry logic.

## Challenge

We will use the term **edge** to refer to a data structure that can represent arbitrary line segments
and circular arcs in two-dimensional coordinate space.

We will use the term **wire** to refer to a data structure that can represent an arbitrary closed loop of
**edges** in two-dimensional coordinate space (with no restrictions on self-intersection). 

Your challenge is to implement these data structures and some specific algorithms for use with them,
as described below.

In addition to implementing these data structures, as part of your submission you should
also include a program (referred to as the "submission program" below) that will use your
data structures and algorithms to generate certain specific outputs described below.
(This could be a python script, compiled C++ program, etc.)

## Steps

1. Implement a concrete data structure that can be used to represent an arbitrary **wire**.

    * (You are free to implement auxiliary geometric data structures for use in this representation)

2. Instantiate this data structure such that it represents a wire containing the following edges:
    
    * The following line segments:
        * (0, 1) -> (0, 9)
        * (1, 0) -> (9, 0)
        * (1, 10) -> (9, 10)
        * (10, 1) -> (10, 9)
    * The following quarter-circle arcs (see the following bullet point for details about the orientation):
        * (0, 1) -> (1, 0)
        * (0, 9) -> (1, 10)
        * (9, 0) -> (10, 1)
        * (9, 10) -> (10, 9)
    * Visualized, the resulting wire should look like a 10x10 rectangle with radius-1 fillets in the corners.

3. Implement serialization for your wire data structure to and from a string representation.

    * In your **submission program**, print your serialized form of the wire described in step 2.
    * In your **submission program**, also deserialize and serialize a 10x10 self-intersecting
    "bowtie"-shaped wire with radius-1 fillets.

4. Implement an algorithm for "discretizing" an arbitrary instance of your wire data structure
into a sequence of linear segments (i.e., without circular arcs), with a specified maximum linear deflection.

    * A discretization of a wire has "maximum linear deflection" less than or equal to `d` provided that
     no point in any of the discretized segments is farther than distance `d` from some point in the
     original wire, and vice versa, no point in the original wire is more than distance `d` from some point
     in one of the discretized segments.
    * In your **submission program**, print the serialized result of this function applied to the
    wire loaded in the previous step, with maximum linear deflection set to 0.01.

5. Implement self-intersection detection for your wire data structure. In particular,
given an instance of your wire data structure, you should be able to call a function or method
on the data structure and determine whether any of its edges have intersections with any
other edges in the wire.

    * Your intersection-detection algorithm doesn't need to have any kind of computational complexity
    or performance guarantees, but you should be prepared to discuss its performance characteristics.
    * In your **submission program**, apply this intersection-detection algorithm to both of the wires
    described above, and check that it confirms that the rounded-rectangle-shaped wire has no self
    intersections, and the rounded-bowtie-shaped wire does.  

## Submission

Your solution can be submitted through the following steps:

* Upload the project as a private repository on GitHub
* Add David Montague (GitHub user dmontagu) to the repository
* Email David at david@formlogic.com once your submission is ready

We do not impose any specific requirements on how we can run your code, but it should be easy
for us to understand how your code works, and for us to apply your algorithms to additional
example wires.

If necessary, please include instructions for how to build/run your submission in its README.md.

If you have any questions, feel free to email David at david@formlogic.com at any time.