import { useCallback, useEffect, useState, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../../UI/LoadingSpinner';
import classes from './AlbumDetail.module.css';

const AlbumDetail = () => {
    const [album, setAlbum] = useState(null);

    const params = useParams();
    const { albumId } = params;

    // console.log("albumId :: ", albumId);
    // console.log("URL :: ", 'https://edpalmeida-my-music-library-1-default-rtdb.firebaseio.com/music_library' + albumId + '.json');
    // Verificar se é necessário o uso de useCallback

    const fetchAlbum = useCallback(async () => {

        try {
            const response = await fetch('https://edpalmeida-my-music-library-1-default-rtdb.firebaseio.com/albums/' + albumId + '.json');
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Could not fetch album.');
            }

            const loadedAlbum = {
                artist   : data.artist,
                genre    : data.genre,
                title    : data.title,
                year     : data.year,
                cover    : data.cover,
                artistId : data.artistId,
                genreId  : data.genreId
            };
            setAlbum(loadedAlbum);

        } catch (error) {
            console.log("ERROR :: ", error.message);
        }
    }, [albumId]);

    useEffect(() => {
        fetchAlbum(albumId);
    }, [fetchAlbum, albumId]);


    return (
        <>
            <Suspense fallback={
                <div className='centered'>
                    <LoadingSpinner />
                </div>
            } >
                { 
                    album ? 
                        <div className={classes.album}>
                            <p>{album.title}</p>
                            <img src={album.cover} alt={album.title} />
                            <Link to  = {`/artists/${album.artist}`} >
                                <figcaption>{album.artist}</figcaption>
                            </Link>
                            <figcaption>{album.year}</figcaption>
                            <Link to  = {`/genres/${album.genre}`} >
                                <figcaption>{album.genre}</figcaption>
                            </Link>
                        </div>
                        : <p>Loading...</p>
                }
            </Suspense>
        </>
      )
}

export default AlbumDetail;
