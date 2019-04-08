import React from 'react';
import JokeGenerator from './joke.generator';
import { render, Simulate } from 'react-testing-library';
import 'jest-dom/extend-expect';

test('JokeGenerator should show default message when no joke is loaded', () => {
    // renders JokeGenerator
    const { getByText } = render(
        <JokeGenerator></JokeGenerator>
    );

    expect(getByText('You haven\'t loaded any joke yet!')).toBeInTheDocument();
});

test('JokeGenerator componente fetches a random joke and renders it', () => {
    // renders JokeGenerator
    const { getByText, queryByText } = render(
        <JokeGenerator></JokeGenerator>
    );

    Simulate.click(getByText('Load a random Joke'));

    expect(queryByText('You haven\'t loaded any joke yet!')).not.toBeInTheDocument();
    expect(queryByText('Loading ...')).toBeInTheDocument();
});