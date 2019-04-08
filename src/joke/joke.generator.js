import React from 'react';
import * as axios from 'axios';
import Joke from './joke';

export default class JokeGenerator extends React.Component {
    state = {
        joke: null,
        loading: false,
    }
    _ismounted = false;

    loadJoke = async () => {
        this.setState({ loading: true });

        const response = await axios.get('https://api.icndb.com/jokes/random');
        if (!this._ismounted) {
            return;
        }

        let joke = null;
        if(response) {
            const { data: { value } } = response;
            joke = value.joke;
        }
        this.setState({ loading: false, joke });
    };

    render() {
        const { joke, loading } = this.state;

        return (
            <React.Fragment>
                {!joke && !loading && <div>You haven't loaded any joke yet!</div>}
                {loading && <div>Loading...</div>}
                {joke && !loading && <Joke text={joke}></Joke>}

                <button onClick={this.loadJoke} type="button">
                    Load a random joke
                </button>
            </React.Fragment>
        );
    }

    componentDidMount() { 
        this._ismounted = true;
    }
    
    componentWillUnmount() {
        this._ismounted = false;
    }
}
