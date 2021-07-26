import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../../UI/LoadingSpinner';
import classes from './AlbumDetail.module.css';

const AlbumDetail = () => {
    const params = useParams();
    const { albumId } = params;

    const data = useSelector(state => state.data.albums)
    
    let albumLoaded = data.find(album => album.id === albumId);
    
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
                                <Link to  = {`/artists/${albumLoaded.artist}`} >
                                    <figcaption>{albumLoaded.artist}</figcaption>
                                </Link>
                                <figcaption>{albumLoaded.year}</figcaption>
                                <Link to  = {`/genres/${albumLoaded.genre}`} >
                                    <figcaption>{albumLoaded.genre}</figcaption>
                                </Link>
                            </div>
                        </>
                    : <LoadingSpinner />
                }
            </Suspense>
        </>
    )
}

export default AlbumDetail;
