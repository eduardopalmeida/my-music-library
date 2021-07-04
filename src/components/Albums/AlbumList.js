import Album from './Album';
import { Link } from 'react-router-dom';
import classes from './AlbumList.module.css';
import AddButton from '../../UI/AddButton';

const AlbumList = (props) => {

    const shortText = (text) => {

        let shortened = text;

        if(text.length > 26) {
            shortened = text.substring(0, 23) + "...";
        }

        return shortened;
    }

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
                                artist = { album.artist             }
                                title =  { shortText(album.title)   }
                                year  =  { album.year               }
                                genre =  { album.genre              }
                                cover =  { album.cover              }
                            />
                        </Link>
                    ))
                }
            </ul>
        </>
    );
}

export default AlbumList;
