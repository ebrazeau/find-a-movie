import { useState, useEffect } from 'react';

const People = (props) => {

    const { personName, photoPath, department } = props;

    return (
        <>
            <h2>{personName}</h2>
            {photoPath === null
                ? <p>No image to display.</p>
                : <img src={`https://image.tmdb.org/t/p/original/${photoPath}`} alt={personName} />}
            <span>{department}</span>
        </>
    );
};

export default People;