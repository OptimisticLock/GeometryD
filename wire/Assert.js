
/**
 * Checks whether condition is true. Otherwise does a number
 * of error handling actions: writes to console, alerts if in browser, throws an error.
 *
 * @see {@link assert}
 *
 * @param condition - a condition that must be true
 * @param message - an error message to be shown otherwise.
 */
function check(condition, message) {

    message ||= "Assertion failed!";

    if (!condition) {
        console.error(message);

        if (alert)
            alert(message);

        throw new Error(message);
    }
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

function assert (condition, message) {
    check(condition, message);
}
