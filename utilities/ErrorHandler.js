"use strict";

// TODO: this file not an OK error handler, but will do for now.

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

