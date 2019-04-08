import React from 'react';
import Joke from './joke';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';

describe('Joke', () => {

    let getByTestId;
    beforeEach(() => {
        // renders Joke component with some text prop
        const element = render(
            <Joke text="The funniest joke this year" ></Joke>
        );
        getByTestId = element.getByTestId;
    });

    it('should receives props and then renders text', () => {

        expect(getByTestId('joke-text')).toHaveTextContent(
            'The funniest joke this year'
        );
    });
});