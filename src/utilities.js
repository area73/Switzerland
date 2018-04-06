import * as R from 'ramda';

/**
 * @method validate ∷ ∀ a. Object String a → [String] → Object String a
 * @param {String} event
 * @param {String} [nodeNames = ['input', 'textarea', 'select']]
 * @return {Object}
 *
 * Uses the built-in HTML validation rules for validating a given form based on the requirements specified
 * on the fields. To use the `validate` utility function it's important to set `novalidate` on the <form />
 * elment, otherwise you'll simply get the default behaviour for form validation, including the built-in
 * validation popups.
 */
export const validate = R.curry((event, nodeNames = ['input', 'textarea', 'select']) => {

    try {

        // Extend the selector to select only elements that have a `name` attribute and are NOT disabled, as
        // that's how traiditional forms function: elements without a name and/or disabled won't be submitted.
        const selector = nodeNames.map(name => `${name}[name]:not(:disabled)`).join(', ');

        // Find the first form that we encounter from the event, and then find all of the related fields using
        // the above selector.
        const form = event.path.find(node => node instanceof HTMLFormElement);
        const fields = Array.from(form.querySelectorAll(selector));

        // Map each of the validity reports into an object where the key is the name of the element. We then perform
        // an `every` operation on the validity reports to see if each element in the form is valid.
        const validityReport = fields.reduce((xs, node) => ({ ...xs, [node.getAttribute('name')]: node.validity }), {});
        const isFormValid = Object.values(validityReport).every(({ valid }) => valid);

        return { results: validityReport, valid: isFormValid, error: null };

    } catch (err) {

        // Yield an indeterminate result as an error was raised in the above code.
        return { results: [], valid: null, error: err };

    }

});

/**
 * @method slots ∷ HTMLElement → String → [HTMLElement]
 * @param {HTMLElement} node
 * @param {String} name
 * @return {Array}
 *
 * Retrieves a list of `HTMLSlotElement`s by the given name.
 */
export const slots = R.curry((node, name) => {
    return Array.from(node.querySelectorAll(`*[slot="${name}"]`));
});

/**
 * @method once ∷ ∀ a b c. (a → b) → (Object String c → b)
 * @param {Function} fn
 * @return {Function}
 *
 * Prevents double-submitting a form as the wrapped function will only be invoked once. On subsequent renders of the
 * components the `once` function will be invoked again, allowing the `fn` to also be invoked again. Instead of
 * `onsubmit={submit}` you would use `onsubmit={once(submit)}` which won't allow `submit` to be invoked again until
 * the next render. Invokes `event.preventDefault` automatically for you.
 */
export const once = fn => {

    const onceFn = R.once(fn);

    return event => {
        'preventDefault' in Object(event) && event.preventDefault();
        return onceFn(event);
    };

};
