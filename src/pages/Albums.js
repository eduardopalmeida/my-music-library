import { useParams } from 'react-router-dom';
import AlbumList from '../components/Albums/AlbumList'
import Message from '../components/Message';
import AddButton from '../UI/AddButton';

const Albums = (props) => {
    const params = useParams();
    
    let noAlbumsFound = false;
    let albums = null;
    let content = null;

    const linkToHandler = () => {
        if(props.albumSource === 1) {
            return ('/new-album?genre=' + params.genreId);
        }
        else if(props.albumSource === 2) {
            return ('/new-album?artist=' + params.artistId);
        }
        else {
            return ('/new-album');
        }
    }

    // GENRES
    if(props.albumSource === 1) { 
        albums = props.albums.filter( album => album.genre === params.genreId );

        if(albums.length === 0) {
            noAlbumsFound = true;

            content = (
                <>
                    <Message text="No Albums found for this Genre, please add some."/>
                    <AddButton
                        linkTo  ={linkToHandler}
                        linkText= {"Add Album"}
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
                    <Message text="No Albums found for this Artist, please add some."/>
                    <AddButton
                        linkTo  = {linkToHandler}
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
            {!noAlbumsFound && 
                <>
                    <AddButton
                        linkTo  = {linkToHandler}
                        linkText= {"Add Album"}
                        side = {true}
                    />
            
                    <AlbumList 
                        albums={albums} 
                        albumSource={props.albumSource}
                    />
                </>
            }
        </>
    )
}

export default Albums
