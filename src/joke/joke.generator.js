import React from 'react';

export default class JokeGenerator extends React.Component {
    state = {
        joke: null,
        loading: false,
    }

    loadJoke = async () => {
        this.setState({ loading: true });
    };

    render() {
        const { joke } = this.state;

        return (
            <React.Fragment>
                {!joke && <div>You haven't loaded any joke yet!</div>}

                <button onClick={this.loadJoke} type="button">
                    Load a random joke
                </button>
            </React.Fragment>
        );
    }
}
