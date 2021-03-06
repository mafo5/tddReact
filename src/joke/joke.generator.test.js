import '@testing-library/jest-dom/extend-expect';
import { cleanup, render, wait } from '@testing-library/react';
import * as axios from 'axios';
import MockAxios from 'axios-mock-adapter';
import React from 'react';
import JokeGenerator from './joke.generator';

jest.mock('./joke', () => ({ text }) => (
    <div data-testid="joke-text">
        JOKE {text}
    </div>
));

describe('JokeGenerator', () => {

    let element;
    let mock;

    beforeEach(() => {
        // renders JokeGenerator
        element = render(
            <JokeGenerator></JokeGenerator>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('should show default message when no joke is loaded', () => {

        expect(element.getByText('You haven\'t loaded any joke yet!')).toBeInTheDocument();
    });

    it('should display button to load joke', () => {

        expect(element.getByText('Load a random joke')).toBeInTheDocument();
    });

    describe('when load joke button is clicked', () => {
        beforeEach(() => {
            mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });
            mock.onGet().replyOnce(200, {
                value: {
                    joke: 'Really funny joke',
                }
            });
            element.getByText('Load a random joke').click();
        });

        it('should display loading', () => {
    
            expect(element.queryByText('You haven\'t loaded any joke yet!')).not.toBeInTheDocument();
            expect(element.queryByText('Loading...')).toBeInTheDocument();
        });

        afterEach(() => {
            mock.restore();
        });
    });

    describe('when a joke is loaded', () => {
        beforeEach(async () => {
            mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });
            mock.onGet().replyOnce(200, {
                value: {
                    joke: 'Really funny joke',
                }
            });
            element.getByText('Load a random joke').click();
            await wait(() => expect(element.queryByText('Loading...')).not.toBeInTheDocument());
        });

        it('should display joke', () => {
    
            expect(element.queryByTestId('joke-text')).toHaveTextContent(
                'JOKE Really funny joke'
            )
        });

        afterEach(() => {
            mock.restore();
        });
    });
});
