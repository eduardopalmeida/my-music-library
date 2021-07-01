import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../UI/LoadingSpinner';
import Artist from './Artist'
import classes from './ArtistList.module.css';

const ArtistList = () => {
    const [artists, setArtists] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchArtists = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://react-http-1eb72-default-rtdb.firebaseio.com/artists.json');

            if(!response.ok) {
                throw new Error('Something went wrong!')
            }
      
            const artistsTemp = await response.json();
            const transformedTemp = [];

            for(const key in artistsTemp) {

                const artistObject = {
                    id : key,
                    ...artistsTemp[key]
                }

                transformedTemp.push(artistObject);
            }


            setArtists(transformedTemp);
      
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }

        setIsLoading(false);

    }, []);

    useEffect(() => {
        fetchArtists();
    }, [fetchArtists]);

    if(isLoading) {
        return (
            <div className={classes.center}>
                <LoadingSpinner />
            </div>
        )
    }

    if(error) {
        return (
            <div className={classes.center}>
                <h1>{error}</h1>
            </div>
        )
    }

    return (
        <>
            <ul className={classes.wrapper}>
                {
                    artists.map( (artist) => (
                        <Link
                            to = {`/artists/${artist.name}`}
                            key = { artist.name }
                        >
                            <Artist 
                                key  = {artist.id}
                                name = {artist.name}
                                img_URL = {artist.url}
                            />
                        </Link>
                    ))
                }
            </ul>
            <div style={{ "textAlign":"center" }}>
                <Link 
                    className='btn'
                    to  ='/new-artist'
                >Add Artist
                </Link>
            </div>
        </>
    );
}

export default ArtistList
