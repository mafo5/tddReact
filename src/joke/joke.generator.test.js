import * as axios from 'axios';
import MockAxios from 'axios-mock-adapter';
import 'jest-dom/extend-expect';
import React from 'react';
import { cleanup, render, wait } from 'react-testing-library';
import JokeGenerator from './joke.generator';

describe('JokeGenerator', () => {

    let element;
    let mock;

    beforeEach(() => {
        // renders JokeGenerator
        element = render(
            <JokeGenerator></JokeGenerator>
        );

        mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });
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
            element.getByText('Load a random joke').click();
        });

        it('should display loading', () => {
    
            expect(element.queryByText('You haven\'t loaded any joke yet!')).not.toBeInTheDocument();
            expect(element.queryByText('Loading...')).toBeInTheDocument();
        });
    });

    describe('when a joke is loaded', () => {
        beforeEach(async () => {
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
                'Really funny joke'
            )
        });

        afterEach(() => {
            mock.restore();
        });
    });
});
