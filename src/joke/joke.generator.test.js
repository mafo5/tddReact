import React from 'react';
import JokeGenerator from './joke.generator';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';

test('JokeGenerator componente fetches a random joke and renders it', () => {
    // renders JokeGenerator
    const { getByText } = render(
        <JokeGenerator></JokeGenerator>
    );

    expect(getByText('You haven\'t loaded any joke yet!')).toBeInTheDocument();
});