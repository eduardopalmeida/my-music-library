import { Suspense, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { addDislike, addLike, fetchAlbumData } from '../../store/data-actions';
import LoadingSpinner from '../../UI/LoadingSpinner';
import classes from './AlbumDetail.module.css';

const AlbumDetail = () => {
    const params = useParams();
    const { albumId } = params;

    let albumLoaded = useSelector(state => state.data.currAlbum);
    const dispatch = useDispatch();
    
    const albumLikeHandler = useCallback(() => {
        setlikes(albumLoaded.like + 1)
        dispatch( addLike(albumId,      albumLoaded.like + 1) );
        dispatch(fetchAlbumData(albumId));
    }, [dispatch, albumId, albumLoaded]);
    
    const albumDisikeHandler = useCallback(() => {
        setdislikes(albumLoaded.dislike + 1)
        dispatch( addDislike(albumId,   albumLoaded.dislike + 1) );
        dispatch(fetchAlbumData(albumId));
    }, [dispatch, albumId, albumLoaded]);

    const [likes, setlikes]         = useState( albumLoaded.like     );
    const [dislikes, setdislikes]   = useState( albumLoaded.dislike  );
    
    useEffect(() => {
        dispatch(fetchAlbumData(albumId));
    }, [dispatch, albumId]);
    
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
