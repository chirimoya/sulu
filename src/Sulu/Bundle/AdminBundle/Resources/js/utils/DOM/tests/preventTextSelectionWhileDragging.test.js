// @flow
import preventTextSelectionWhileDragging from '../preventTextSelectionWhileDragging';

afterEach(() => {
    window.dispatchEvent(new MouseEvent('mouseup'));
});

test('Should turn off the text selection until the pointer is released', () => {
    const body = document.body;
    if (!body) {
        throw new Error('The body is needed for this test');
    }

    body.style.userSelect = 'text';

    preventTextSelectionWhileDragging();
    expect(body).toHaveStyle({userSelect: 'none'});

    window.dispatchEvent(new MouseEvent('mouseup'));
    expect(body).toHaveStyle({userSelect: 'text'});

    body.style.userSelect = '';
});

test('Should remove an already started text selection', () => {
    const removeAllRanges = jest.fn();
    const getSelectionSpy = jest.spyOn(window, 'getSelection').mockReturnValue(({removeAllRanges}: any));

    preventTextSelectionWhileDragging();

    expect(removeAllRanges).toHaveBeenCalledTimes(1);

    getSelectionSpy.mockRestore();
});

test('Should restore the original value when called twice during one drag', () => {
    const body = document.body;
    if (!body) {
        throw new Error('The body is needed for this test');
    }

    preventTextSelectionWhileDragging();
    preventTextSelectionWhileDragging();

    window.dispatchEvent(new MouseEvent('mouseup'));
    expect(body).not.toHaveStyle({userSelect: 'none'});
});
