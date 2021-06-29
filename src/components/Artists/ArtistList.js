import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Artist from './Artist'
import classes from './ArtistList.module.css';

const ArtistList = (props) => {
    const [faces, setFaces] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFaces = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://react-http-1eb72-default-rtdb.firebaseio.com/caras.json');

            if(!response.ok) {
                throw new Error('Something went wrong!')
            }
      
            const facesTemp = await response.json();

            setFaces(facesTemp);
      
        } catch (error) {
            setError(error.message);
        }

    }, []);

    useEffect(() => {
        fetchFaces();
    }, [fetchFaces]);

    return (
        <ul className={classes.wrapper}>
            {
                props.artists.map( (artist) => (
                    <Link
                        to = {`/artists/${artist.name}`}
                        key = { artist.name }
                    >
                        <Artist 
                        key  = {artist.key}
                        name = {artist.name}
                        img_URL = {faces[artist.name]}
                        />
                    </Link>
                ))
            }
        </ul>
    );
}

export default ArtistList
