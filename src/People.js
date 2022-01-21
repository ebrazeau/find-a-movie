const People = (props) => {

    const { personName, photoPath, department } = props;

    return (
        <>
            <h2>{personName}</h2>
            {photoPath === null
                ? <div className="movieImg"><p>No image to display.</p></div>
                : <img src={`https://image.tmdb.org/t/p/original/${photoPath}`} alt={personName} />}
            <span className="department">{department}</span>
        </>
    );
};

export default People;