import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { addDislike, addLike } from '../../store/data-actions';
import LoadingSpinner from '../../UI/LoadingSpinner';
import classes from './AlbumDetail.module.css';

const AlbumDetail = () => {
    const params = useParams();
    const { albumId } = params;

    let albums = useSelector(state => state.data.albums);

    let albumLoaded = albums.find(album => album.id === albumId);

    console.log("albumLoaded : ", albumLoaded);

    const dispatch = useDispatch();

    useEffect(() => {
        if(albumLoaded !== undefined) {
            setlikes(albumLoaded.like);
            setdislikes(albumLoaded.dislike);
        }
    }, [albumLoaded]);

    const [likes, setlikes]         = useState( 0 );
    const [dislikes, setdislikes]   = useState( 0 );
    
    const albumLikeHandler = () => {
        dispatch( addLike(albumId, likes + 1) );
        setlikes(likes + 1);
    }

    const albumDisikeHandler = () => {
        dispatch( addDislike(albumId, dislikes + 1) );
        setdislikes(dislikes + 1);
    }
    
    return (
        <>
            <Suspense fallback={
                <LoadingSpinner />
            } >
                { 
                    albumLoaded ? 
                        <>
                            <div className={classes.album}>
                                <p>{albumLoaded.title}</p>
                                <img src={albumLoaded.cover} alt={albumLoaded.title} />
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
                                >Like { likes }</button>
                                <button 
                                    className={classes.btnDislike} 
                                    onClick={albumDisikeHandler} 
                                >Dislike { dislikes }</button>
                            </div>
                        </>
                    : <LoadingSpinner />
                }
            </Suspense>
        </>
    )
}

export default AlbumDetail;
