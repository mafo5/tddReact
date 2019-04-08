import React from 'react';
import JokeGenerator from './joke.generator';
import { render, fireEvent, waitForElement, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

describe('JokeGenerator', () => {

    let getByText;
    let queryByText;

    beforeEach(() => {
        // renders JokeGenerator
        const element = render(
            <JokeGenerator></JokeGenerator>
        );
        getByText = element.getByText;
        queryByText = element.queryByText;
    });

    afterEach(() => {
        cleanup();
    });

    it('should show default message when no joke is loaded', () => {

        expect(getByText('You haven\'t loaded any joke yet!')).toBeInTheDocument();
    });

    it('should display button to load joke', () => {

        expect(getByText('Load a random joke')).toBeInTheDocument();
    });

    describe('when load joke button is clicked', () => {
        beforeEach(() => {
            getByText('Load a random joke').click();
        });

        it('should display loading', () => {
    
            expect(queryByText('You haven\'t loaded any joke yet!')).not.toBeInTheDocument();
            expect(queryByText('Loading...')).toBeInTheDocument();
        });
    });
});
