import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Genre from "./Genre";
import AddButton from '../../UI/AddButton';
import classes from '../GAAlist.module.css';
import { fetchGAAData, fetchGenreArtistSet } from '../../store/data-actions';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { dataSliceActions } from '../../store/data-slice';

const GenreList = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data.genres)

    useEffect(() => {
        dispatch(dataSliceActions.cleanCurrAlbum());
        dispatch(fetchGAAData('genres'));
        dispatch(fetchGenreArtistSet('genres'));
    }, [dispatch]);

    return (
        data ? 
            <>
                <AddButton
                    linkTo  ={'/new-genre'}
                    linkText= {"Add Genre"}
                    side = {true}
                />
                <ul className={classes.wrapper}>
                    {
                        data.map( (genre) => (
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
                        ))
                    }
                </ul>
            </> 
        : <LoadingSpinner />
    )
}

export default GenreList
