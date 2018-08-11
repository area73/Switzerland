/**
 * @function dispatchEvent ∷ ∀ a. String → Object String a → void
 * ---
 * Dispatches an event, merging in the current package's version for handling legacy events
 * if/when the payloads differ from version-to-version.
 */
export const dispatchEvent = (name, payload) => {
    payload.node.dispatchEvent(
        new CustomEvent(name, {
            detail: { ...payload, version: process.env.npm_config_version },
            bubbles: true,
            composed: true
        })
    );
};

/**
 * @function getEventName ∷ String → String
 * ---
 * Prepends all event names with the '@switzerland' scope.
 */
export const getEventName = label => {
    return `@switzerland/${label}`;
};

/**
 * @function namespace ∷ String|void
 * ---
 * Attempts to locate whether the JS file was included using a namespace, denoted by the "data-namespace"
 * attribute on the <script /> tag.
 */
export const getNamespace = () => {
    global.document &&
        document.currentScript &&
        document.currentScript.dataset.namespace;
};

/**
 * @function message ∷ String → String → void
 * ---
 * Takes a message and an optional console type for output. During minification this function will be removed
 * from the generated output if 'NODE_ENV' is defined as 'production', as it will be unused due to 'process.env'
 * checks later on in the code.
 */
export const consoleMessage = (text, type = 'error') => {
    console[type](`\uD83C\uDDE8\uD83C\uDDED Switzerland: ${text}.`);
};