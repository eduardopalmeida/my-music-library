import Album from './Album';
import { Link } from 'react-router-dom';
import classes from './AlbumList.module.css';

const AlbumList = (props) => {
    return (
        <>
            <div className={classes.btnAddAlbum}>
                <Link 
                    className='btn'
                    to  ='/new-album'
                >Add Album
                </Link>
            </div>
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
        </>
    );
}

export default AlbumList;
