import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGAAData } from '../../store/data-actions';
import AddButton from '../../UI/AddButton';
import Genre from "./Genre";
import classes from './GenreList.module.css';

const GenreList = () => {
    
    const dispatch = useDispatch();
    const data = useSelector(state => state.data.genres)

    useEffect(() => {
        dispatch(fetchGAAData('genres'));
    }, [dispatch]);

    return (
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
    )
}

export default GenreList
