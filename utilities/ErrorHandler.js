"use strict";


class ErrorHandler {
    // Set to true to suppress browser alert dialog.
    static quieter = false;
}


class AssertionError extends Error {
    constructor(message) {
        super(message);
    }
}

/**
 * Checks whether condition is true. If true, does nothing. Otherwise, does a number
 * of error handling actions.
 *
 * @see {@link assert}
 *
 * @param condition - a condition that must be true
 * @param message - an error message to be shown otherwise.
 */
function check(condition, message) {

    message ||= "Assertion failed!";

    if (condition)
        return;

    console.error(message);

    // TODO: this is kind of controversial, but will do for now.
    if (alert && ! ErrorHandler.quieter)
        alert(message);

    throw new AssertionError(message);
}


/**
 * Asserts that the condition is true. Otherwise does a number
 * of error handling actions: writes to console, alerts browser, throws an error.
 *
 * This is different from check() in that check() are errors that can
 * realistically happen (for example, a public method's precondition not met),
 * whereas assert() represents a sanity check that must always be true.
 *
 * @see {@link check}
 *
 * @param condition - a condition that must be true
 * @param message - an error message to be shown otherwise.
 */

function assert(condition, message) {
    check(condition, message);
}

/**
 * Handle errors. Typically, called from a catch statement
 * @param {Error} error
 */
function handleError(error) {

    // Already handled.
    if (error instanceof AssertionError)
        return;

    check(false, error.message);
}

//ErrorHandler.js:26 Arc radius 2.4778407003428584 too small to connect points (7.139425700209703, 7.453025507997502) and (1.0833193286517306, 2.112050758435382). Must be at least 4.05
