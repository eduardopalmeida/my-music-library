import {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addDislike, addLike, fetchAlbumData } from '../../store/data-actions';
import LoadingSpinner from '../../UI/LoadingSpinner';
import classes from './AlbumDetail.module.css';

const AlbumDetail = () => {
    const params = useParams();
    const { albumId } = params;
    
    let albumLoaded = useSelector(state => state.data.currAlbum);
    
    const dispatch = useDispatch();
    
    const [likes,       setlikes       ] = useState( -1 );
    const [dislikes,    setDislikes    ] = useState( -1 );

    useEffect(() => {
        dispatch(fetchAlbumData(albumId));
    }, [albumId, dispatch]);    
 
    const albumLikeHandler = () => {
        if(likes === -1) {
            setlikes(albumLoaded.like + 1)
            setDislikes(albumLoaded.dislike)
        }
        else {
            setlikes(likes + 1);
        }

        dispatch( addLike(albumId, likes + 1) );
        // dispatch(fetchAlbumData(albumId));
    }

    const albumDisikeHandler = () => {
        if(dislikes === -1) {
            setlikes(albumLoaded.like + 1)
            setDislikes(albumLoaded.dislike)
        }
        else {
            setDislikes(dislikes + 1);
        }

        dispatch( addDislike(albumId, dislikes + 1) );
        // dispatch(fetchAlbumData(albumId));
    }

    return (
        <>
            {
                albumLoaded !== undefined ?
                <>
                    <div className={classes.album}>
                            <p>{albumLoaded.title}</p>
                            <img 
                                src={albumLoaded.cover} 
                                alt={albumLoaded.title} 
                            />
                            <Link to = {`/artists/${albumLoaded.artist}`} >
                                <figcaption>{albumLoaded.artist}</figcaption>
                            </Link>
                            <figcaption>{albumLoaded.year}</figcaption>
                            <Link to = {`/genres/${albumLoaded.genre}`} >
                                <figcaption>{albumLoaded.genre}</figcaption>
                            </Link>
                            <button 
                                className={classes.btnLike} 
                                onClick={albumLikeHandler} 
                            >Like { likes === -1 ? albumLoaded.like : likes}</button>
                            <button 
                                className={classes.btnDislike} 
                                onClick={albumDisikeHandler} 
                            >Dislike { dislikes === -1 ? albumLoaded.dislike : dislikes }</button>
                    </div>
                </>
                : <LoadingSpinner />
            }
        </>
    )
}

export default AlbumDetail;
