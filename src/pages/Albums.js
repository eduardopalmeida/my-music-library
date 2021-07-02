import { useParams } from 'react-router-dom';
import AlbumList from '../components/Albums/AlbumList'
import Message from '../components/Message';

const Albums = (props) => {

    const params = useParams();
    
    let noAlbumsFound = false;
    let albums = null;

    if(props.albumSource === 1) {
        albums = props.albums.filter( album => album.genre === params.genreId );

        if(albums.length === 0) {
            noAlbumsFound = true;
        }
    }
    else if(props.albumSource === 2) {
        albums = props.albums.filter( album => album.artist === params.artistId );

        if(albums.length === 0) {
            noAlbumsFound = true;
        }
    }
    else {
        albums = props.albums;
    }

    return (
        <>
            {noAlbumsFound && <Message text="No albums found, please add some."/>}
            {!noAlbumsFound && <AlbumList albums={albums} />}
        </>
    )
}

export default Albums
