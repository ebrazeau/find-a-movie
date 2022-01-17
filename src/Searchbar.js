// Header.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const Searchbar = () => {

    const [error, setError] = useState(null);
    const [movies, setMovies] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('-');

    // we only want our API to call when user submits the search form
    useEffect(() => {
        axios({
            url: `https://api.themoviedb.org/3/search/movie?api_key=853030e957dca57316fe835ed75d0d32&language=en-US&query=${searchQuery}&page=1&include_adult=false`,
            method: 'GET',
            dataResponse: 'json',
        }).then(
            (response) => {
                const rawData = response.data.results;
                console.log(rawData);
                setMovies(rawData);
            },
            (error) => {
                setError(error);
            }
        )
    }, [searchQuery]);

    // function runs every time the user enters text (onchange)
    const handleInput = (event) => {
        // put the captured text in userInput
        setUserInput(event.target.value);
    }

    // handle our form submit
    // empty previous array and replace with new search
    const handleSubmit = (event) => {
        event.preventDefault();
        // set the term that calls our API
        setSearchQuery(userInput);
        // RESET array
        setUserInput("");
    }

    if (error) {
        return (
            <div>Error: {error.message}</div>
        )
    } else {
        return (
            <div className="App">
                <header>
                    <h1>Check out these movies</h1>

                    {/* This bit should be its own searchbar component */}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="art">Search for movies:</label>
                        <input type="text" id="search" onChange={handleInput} value={userInput} />
                        <button>Search</button>
                    </form>
                </header>

                {/* Should also be a component? */}
                <section className="results">
                    {movies.map((movie) => {
                        return (
                            <div key={movie.id} className="movieCard">
                                <h2>{movie.original_title}</h2>
                                {movie.poster_path === null
                                    ? <p>No poster to display.</p>
                                    : <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.original_title} />}
                            </div>
                        )
                    })
                    }
                </section>

            </div>
        );
    }

}

export default Searchbar;