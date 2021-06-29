import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
            setGenres(genresTemp);
      
        } catch (error) {
            setError(error.message);
        }

    }, []);

    useEffect(() => {
        fetchGenres();
    }, [fetchGenres]);

    return (
        <ul className={classes.wrapper}>
            {
                props.genres.map( (genre) => (
                    <Link 
                        to  = {`/genres/${genre.name}`}
                        key = { genre.key }
                    >
                        <Genre 
                            key   = {genre.key}
                            name  = {genre.name}
                            img_URL = {genres[genre.name]}
                        />
                    </Link>
            ))}
        </ul>
    )
}

export default GenreList
