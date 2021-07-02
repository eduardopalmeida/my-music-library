import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../UI/LoadingSpinner';
import Artist from './Artist'
import classes from './ArtistList.module.css';

const ArtistList = () => {
    const [artists, setArtists] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sortArtists = ( a, b ) => {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
      }

    const fetchArtists = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://react-http-1eb72-default-rtdb.firebaseio.com/artists.json');
            const artistsTemp = await response.json();
            const transformedTemp = [];

            if(!response.ok) {
                throw new Error('Something went wrong!')
            }

            for(const key in artistsTemp) {

                const artistObject = {
                    id : key,
                    ...artistsTemp[key]
                }

                transformedTemp.push(artistObject);
            }

            transformedTemp.sort(sortArtists);

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
            <div className={classes.btnAddArtist}>
                <Link 
                    className='btn'
                    to  ='/new-artist'
                >Add Artist
                </Link>
            </div>
            <ul className={classes.wrapper}>
                {
                    artists.map( (artist) => (
                        <Link
                            to = {`/artists/${artist.name}`}
                            key = { artist.id }
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
        </>
    );
}

export default ArtistList
