import React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';

test('Joke componente receives props and then renders text', () => {
    // renders Joke component with some text prop
    const { getByTestId } = render(
        <Joke text="The funniest joke this year" ></Joke>
    );

    expect(getByTestId('joke-text')).toHaveTextContent(
        'The funniest joke this year'
    );
});