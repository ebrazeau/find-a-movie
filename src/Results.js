import {useState, useEffect} from 'react';
import Movie from './Movie';
import People from './People';

const Results = (props) => {
    
    const {movies, people} = props;
    
    return (
        <section className="results">

            {movies === []
                ? <p>Nothing to see</p>
                : movies.map((item, index) => {
                    return (
                        <div key={item.id} className="movieCard">
                            <div className="movieContainer">
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
                        </div>
                    )
                })}

            {people === []
                ? <p>Nothing to see</p>
                : people.map((item, index) => {
                    return (
                        <div key={item.id} className="movieCard">
                            <div className="movieContainer">
                                <People
                                    personName={item.name}
                                    photoPath={item.profile_path}
                                    department={item.known_for_department}
                                    number={index}
                                />
                            </div>
                        </div>
                    )
                })}

        </section>
)

};

export default Results;