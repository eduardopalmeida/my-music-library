import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Artist from './Artist'
import AddButton from '../../UI/AddButton';
import classes from './ArtistList.module.css';
import { useEffect } from 'react';
import { fetchGAAData } from '../../store/data-actions';

const ArtistList = (props) => {

    const dispatch = useDispatch();
    const data = useSelector(state => state.data.artists)

    useEffect(() => {
        dispatch(fetchGAAData('artists'));
    }, [dispatch]);
        

    return (
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
