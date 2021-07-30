import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Artist from './Artist'
import AddButton from '../../UI/AddButton';
import classes from '../GAAlist.module.css';
import { useEffect } from 'react';
import { fetchGAAData, fetchGenreArtistSet } from '../../store/data-actions';
import LoadingSpinner from '../../UI/LoadingSpinner';

const ArtistList = (props) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data.artists)

    useEffect(() => {
        dispatch(fetchGAAData('artists'));
        dispatch(fetchGenreArtistSet('artists'));
    }, [dispatch]);        

    return (
        data ? 
            <>
                <AddButton
                    linkTo  ={'/new-artist'}
                    linkText= {"Add Artist"}
                    side = {true}
                />
                <ul className={classes.wrapper}>
                    {
                        data.map( (artist) => (
                            <Link
                                to = {`/artists/${artist.name}`}
                                key = { artist.id }
                            >
                                <Artist 
                                    key     = {artist.id}
                                    name    = {artist.name}
                                    img_URL = {artist.url}
                                />
                            </Link>
                        ))
                    }
                </ul>
            </> 
        : <LoadingSpinner />
    );
}

export default ArtistList
