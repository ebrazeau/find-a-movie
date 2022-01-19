import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar.js';
import Movie from './Movie';
import People from './People';

function App() {
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('-');

  const [people, setPeople] = useState([]);
  const [userInput2, setUserInput2] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('-');


  // Search by title
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
    )}, [searchQuery]);
    
    // function runs every time the user enters text (onchange)
    const handleInput = (event) => {
      // put the captured text in userInput
      setUserInput(event.target.value);
    }
  
    // handle our title form submit
    // empty previous array and replace with new search
    const handleSubmit = (event) => {
      event.preventDefault();
      // set the term that calls our API
      setSearchQuery(userInput);
      // RESET array
      setUserInput("");
      setPeople([]);
    }
  
  // Search by crew member
  useEffect(() => {
    axios({
      url: `https://api.themoviedb.org/3/search/person?api_key=853030e957dca57316fe835ed75d0d32&language=en-US&query=${searchQuery2}&page=1&include_adult=false`,
      method: 'GET',
      dataResponse: 'json',
    }).then(
      (response) => {
        const rawData = response.data.results;
        console.log(rawData);
        setPeople(rawData);
      },
      (error) => {
        setError(error);
      }
    )
  }, [searchQuery2]);

  // onchange function for cast
  const handleInput2 = (event) => {
    // put the captured text in userInput
    setUserInput2(event.target.value);
  }

  // submit function for cast
  const handleSubmit2 = (event) => {
    event.preventDefault();
    // set the term that calls our API
    setSearchQuery2(userInput2);
    // RESET array
    setUserInput2("");
    setMovies([]);
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
            <label htmlFor="movie">Search by title</label>
            <input type="text" id="search" onChange={handleInput} value={userInput}/>
            <button>Search</button>
          </form>

          <form onSubmit={handleSubmit2}>
            <label htmlFor="crew">Search by crew</label>
            <input type="text" id="search" onChange={handleInput2} value={userInput2} />
            <button>Search</button>
          </form>

        </header>

      <section className="results">

        {movies === []
          ? <p>Nothing to see</p>
          : movies.map((item, index) => {
            return (
              <div key={item.id} className="movieCard">
                <Movie
                  movieTitle={item.original_title}
                  posterPath={item.poster_path}
                  backdropPath={item.backdrop_path}
                  overview={item.overview}
                  popularity={item.popularity}
                  releaseDate={item.release_date}
                  number={index}
                />
              </div>
            )})}

        {people === []
          ? <p>Nothing to see</p>
          : people.map((item, index) => {
            return (
              <div key={item.id} className="movieCard">
                <People
                  personName={item.name}
                  photoPath={item.profile_path}
                  department={item.known_for_department}
                />
              </div>
            )})}

      </section>

      </div>
    );
  }
};

export default App;
