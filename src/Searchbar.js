import {useState, useEffect} from 'react';
import axios from 'axios';

const Searchbar = (props) => {
    
    const [movies, setMovies] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('-');

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

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="art">Search by title</label>
            <input type="text" id="search" onChange={handleInput} value={userInput} />
            <button>Search</button>
        </form>
    )
};

export default Searchbar;