import { useState, useEffect } from 'react';

const Movie = (props) => {

    const {movieTitle, number, posterPath, backdropPath, overview, popularity, releaseDate} = props;


    return (
            <div>
            <h2>{movieTitle}</h2>
            {posterPath === null
                ? <p>No poster to display.</p>
                : <img src={`https://image.tmdb.org/t/p/original/${posterPath}`} alt={movieTitle} />}
            </div>
    );
};

export default Movie;