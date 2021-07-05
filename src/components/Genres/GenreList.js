import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddButton from '../../UI/AddButton';
import LoadingSpinner from '../../UI/LoadingSpinner';
import Genre from "./Genre";
import classes from './GenreList.module.css';

const GenreList = (props) => {
    const [genres, setGenres] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sortGenres = ( a, b ) => {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
    }

    const fetchGenres = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://edpalmeida-my-music-library-1-default-rtdb.firebaseio.com/genres.json');
            const genresTemp = await response.json();
            const transformedTemp = [];

            if(!response.ok) {
                throw new Error('Something went wrong!')
            }
      
            for(const key in genresTemp) {
                const genreObject = {
                    id : key,
                    ...genresTemp[key]
                }
                transformedTemp.push(genreObject);
            }

            transformedTemp.sort(sortGenres);

            setGenres(transformedTemp);
      
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }

        setIsLoading(false);

    }, []);

    useEffect(() => {
        fetchGenres();
    }, [fetchGenres]);

    if(isLoading) {
        return (
                <LoadingSpinner />
        )
    }

    if(error) {
        return (
            <div className='centered'>
                <h1>{error}</h1>
            </div>
        )
    }

    return (
        <>
            <AddButton
                linkTo  ={'/new-genre'}
                linkText= {"Add Genre"}
                side = {true}
            />
            <ul className={classes.wrapper}>
                {
                    genres.map( (genre) => (
                        <Link 
                            to  = {`/genres/${genre.name}`}
                            key = { genre.id }
                        >
                            <Genre 
                                key     = {genre.id}
                                name    = {genre.name}
                                img_URL = {genre.url}
                            />
                        </Link>
                ))}
            </ul>
        </>
    )
}

export default GenreList
