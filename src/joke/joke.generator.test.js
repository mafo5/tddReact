import * as axios from 'axios';
import MockAxios from 'axios-mock-adapter';
import 'jest-dom/extend-expect';
import React from 'react';
import { cleanup, render, wait } from 'react-testing-library';
import JokeGenerator from './joke.generator';

describe('JokeGenerator', () => {

    let getByText;
    let queryByText;
    let queryByTestId;
    let mock;

    beforeEach(() => {
        // renders JokeGenerator
        const element = render(
            <JokeGenerator></JokeGenerator>
        );
        getByText = element.getByText;
        queryByText = element.queryByText;
        queryByTestId = element.queryByTestId;

        mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });
    });

    afterEach(() => {
        cleanup();
        mock.restore();
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

    describe('when a joke is loaded', () => {
        beforeEach(async () => {
            mock.onGet().replyOnce(200, {
                value: {
                    joke: 'Really funny joke',
                }
            });
            getByText('Load a random joke').click();
            await wait(() => expect(queryByText('Loading...')).not.toBeInTheDocument());
        });

        it('should display joke', async () => {
    
            expect(queryByTestId('joke-text')).toHaveTextContent(
                'Really funny joke'
            )
        });
    });
});
