import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Joke from './joke';

describe('Joke', () => {

    let getByTestId;
    beforeEach(() => {
        // renders Joke component with some text prop
        const element = render(
            <Joke text="The funniest joke this year" ></Joke>
        );
        getByTestId = element.getByTestId;
    });

    afterEach(() => {
        cleanup();
    });

    it('should receives props and then renders text', () => {

        expect(getByTestId('joke-text')).toHaveTextContent(
            'The funniest joke this year'
        );
    });
});