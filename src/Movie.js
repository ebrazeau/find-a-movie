const Movie = (props) => {

    const {movieTitle, posterPath, overview, popularity, releaseDate} = props;

    return (
        <>
        <h2>{movieTitle}</h2>
        {posterPath === null
            ? <div className="movieImg"><p>No image to display.</p></div>
            : <img src={`https://image.tmdb.org/t/p/original/${posterPath}`} alt={movieTitle} />}
        <span class="transparent">Released On</span>
        <span className="releaseDate">{releaseDate}</span>
        </>
    );
};

export default Movie;
