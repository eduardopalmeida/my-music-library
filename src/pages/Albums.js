import { useParams } from 'react-router-dom';
import AlbumList from '../components/Albums/AlbumList'

const Albums = (props) => {

    const params = useParams();

    console.log("PARAMS :: ", params);

    let albums = null;

    if(props.albumSource === 1) {
        albums = props.albums.filter( album => album.genre === params.genreId );
    }
    else if(props.albumSource === 2) {
        albums = props.albums.filter( album => album.artist === params.artistId );
    }
    else {
        albums = props.albums;
    }

    return (
            <AlbumList albums={albums} />
    )
}

export default Albums
