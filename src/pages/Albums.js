import { useParams } from 'react-router-dom';
import AlbumList from '../components/Albums/AlbumList'
import Message from '../components/Message';
import AddButton from '../UI/AddButton';

const Albums = (props) => {

    const params = useParams();
    
    let noAlbumsFound = false;
    let albums = null;
    let content = null;


    // GENRES
    if(props.albumSource === 1) { 
        albums = props.albums.filter( album => album.genre === params.genreId );

        if(albums.length === 0) {
            noAlbumsFound = true;

            content = (
                <>
                    <Message text="No Artists found, please add some."/>
                    <AddButton
                        linkTo  ={'/new-artist'}
                        linkText= {"Add Artist"}
                        side = {false}
                    />
                </>
            )
        }
    }

    // ARTISTS
    else if(props.albumSource === 2) { 
        albums = props.albums.filter( album => album.artist === params.artistId );

        if(albums.length === 0) {
            noAlbumsFound = true;

            content = (
                <>
                    <Message text="No Albums found, please add some."/>
                    <AddButton
                        linkTo  ={'/new-album'}
                        linkText= {"Add Album"}
                        side = {false}
                    />
                </>
            )
        }
    }
    else {
        albums = props.albums;
    }

    return (
        <>
            {noAlbumsFound && content }
            {!noAlbumsFound && <AlbumList albums={albums} />}
        </>
    )
}

export default Albums
