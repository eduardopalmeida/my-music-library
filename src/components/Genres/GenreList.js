import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../UI/LoadingSpinner';
import Genre from "./Genre";
import classes from './GenreList.module.css';

const GenreList = (props) => {
    const [genres, setGenres] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGenres = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://react-http-1eb72-default-rtdb.firebaseio.com/genres.json');

            if(!response.ok) {
                throw new Error('Something went wrong!')
            }
      
            const genresTemp = await response.json();

            const transformedTemp = [];

            for(const key in genresTemp) {

                const genreObject = {
                    id : key,
                    ...genresTemp[key]
                }

                transformedTemp.push(genreObject);
            }

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
                    genres.map( (genre) => (
                        <Link 
                            to  = {`/genres/${genre.name}`}
                            key = { genre.id }
                        >
                            <Genre 
                                name  = {genre.name}
                                img_URL = {genre.url}
                            />
                        </Link>
                ))}
            </ul>
            <div style={{ "textAlign":"center" }}>
                <Link 
                    className='btn'
                    to  ='/new-genre'
                >Add Genre
                </Link>
            </div>
        </>
    )
}

export default GenreList
