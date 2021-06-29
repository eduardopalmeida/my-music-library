import Album from './Album';
import { Link } from 'react-router-dom';
import classes from './AlbumList.module.css';

const AlbumList = (props) => {

    if(props.artistAlbums) {
        console.log("artistId :: ", props.artistId);
    }

    return (
        <>
            <ul className={classes.wrapper}>
                {
                    props.albums.map( (album) => (
                        <Link 
                            to  = {`/albums/${album.key}`}
                            key = { album.key }
                        >
                            <Album 
                                artist = { album.artist }
                                title =  { album.title }
                                year  =  { album.year  }
                                genre =  { album.genre }
                                cover =  { album.cover }
                            />
                        </Link>
                ))}
            </ul>
            {/* <button>Add Album</button> */}
        </>
    );
}

export default AlbumList;
