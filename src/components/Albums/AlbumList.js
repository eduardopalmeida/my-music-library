import Album from './Album';
import { Link } from 'react-router-dom';
import classes from './AlbumList.module.css';
import AddButton from '../../UI/AddButton';

const AlbumList = (props) => {
    return (
        <>
            <AddButton
                linkTo  ={'/new-album'}
                linkText= {"Add Album"}
                side = {true}
            />
            <ul className={classes.wrapper}>
                {
                    props.albums.map( (album) => (
                        <Link 
                            to  = {`/albums/${album.id}`}
                            key = { album.id }
                        >
                            <Album 
                                artist = { album.artist }
                                title =  { album.title }
                                year  =  { album.year  }
                                genre =  { album.genre }
                                cover =  { album.cover }
                            />
                        </Link>
                    ))
                }
            </ul>
        </>
    );
}

export default AlbumList;
