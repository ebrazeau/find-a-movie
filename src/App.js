import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Results from './Results';

function App() {
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [people, setPeople] = useState([]);
  const [userInput2, setUserInput2] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');

  const [alert, setAlert] = useState(false);

  // Search by title
  useEffect(() => {
    if (searchQuery !== "") {
      axios({
        url: `https://api.themoviedb.org/3/search/movie?api_key=853030e957dca57316fe835ed75d0d32&language=en-US&query=${searchQuery}&page=1&include_adult=false`,
        method: 'GET',
        dataResponse: 'json',   
      }).then(
        (response) => {
          const rawData = response.data.results;
          if (rawData.length === 0) {
            setAlert(true);
          } else {
            setMovies(rawData);
            setAlert(false);
          }
        },
        (error) => {
          setError(error);
        })
      }}, [searchQuery]);

      useEffect(() => {
        console.log('hi');
      }, [])


    // Onchange for movie title text input
    const handleInput = (event) => {
      // put the captured text in userInput
      setUserInput(event.target.value);
    }
  
    // Handle our title form submit
    // empty previous array and replace with new search
    const handleSubmit = (event) => {
      event.preventDefault();
      // set the term that calls our API
      setSearchQuery(userInput);
      // RESET array / results section
      setUserInput("");
      setPeople([]);
    }
  
  // Search by crew member
  useEffect(() => {
    if (searchQuery2 !== "") {
    axios({
      url: `https://api.themoviedb.org/3/search/person?api_key=853030e957dca57316fe835ed75d0d32&language=en-US&query=${searchQuery2}&page=1&include_adult=false`,
      method: 'GET',
      dataResponse: 'json',
    }).then(
      (response) => {
        const rawData = response.data.results;
        setPeople(rawData);

        if (rawData.length === 0) {
          setAlert(true);
        } else {
          setPeople(rawData);
          setAlert(false);
        }
      },
      (error) => {
        setError(error);
      }
    )
  }}, [searchQuery2]);

  // Onchange function for cast field
  const handleInput2 = (event) => {
    // put the captured text in userInput
    setUserInput2(event.target.value);
  }

  // Form submit for cast 
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
          <h1>Moviesearch</h1>

          <div className="formContainer">
            <form onSubmit={handleSubmit}>
              <label htmlFor="movie">Title</label>
              <input type="text" id="search" onChange={handleInput} value={userInput} placeholder='Enter Movie Title'/>
              <button>Search</button>
            </form>

            <form onSubmit={handleSubmit2}>
              <label htmlFor="crew">Crew member</label>
              <input type="text" id="search" onChange={handleInput2} value={userInput2} placeholder='Enter Person' />
              <button>Search</button>
            </form>
          </div>
        </header>

        {alert === false
        ? <Results 
              movies={movies}
              people={people}
          />
        : <section className="noResults">
            <p>Your search term returned no results.</p>
          </section>}

      </div>
    );
  }
};

export default App;
