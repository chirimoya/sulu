// @flow
const RELEASE_EVENTS = ['mouseup', 'touchend', 'touchcancel'];

// Safari only knows the prefixed property
const USER_SELECT_PROPERTIES = ['user-select', '-webkit-user-select'];

/**
 * Keeps the browser from selecting text while something is dragged with the pointer.
 * Text selection is turned off for the whole document and an already started selection is removed.
 * Everything is restored as soon as the pointer is released.
 */
export default function preventTextSelectionWhileDragging() {
    const body = document.body;

    if (!body || body.dataset.textSelectionPrevented) {
        return;
    }

    const previousValues = USER_SELECT_PROPERTIES.map((property) => body.style.getPropertyValue(property));

    body.dataset.textSelectionPrevented = 'true';
    USER_SELECT_PROPERTIES.forEach((property) => body.style.setProperty(property, 'none'));

    const selection = window.getSelection ? window.getSelection() : null;
    if (selection) {
        selection.removeAllRanges();
    }

    const restore = () => {
        delete body.dataset.textSelectionPrevented;
        USER_SELECT_PROPERTIES.forEach((property, index) => body.style.setProperty(property, previousValues[index]));

        RELEASE_EVENTS.forEach((eventName) => window.removeEventListener(eventName, restore, true));
    };

    RELEASE_EVENTS.forEach((eventName) => window.addEventListener(eventName, restore, true));
}
