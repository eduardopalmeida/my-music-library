import Album from './Album';
import { Link } from 'react-router-dom';
import classes from './AlbumList.module.css';

const AlbumList = (props) => {

    const shortText = (text) => {

        let shortened = text;

        if(text.length > 26) {
            shortened = text.substring(0, 23) + "...";
        }

        return shortened;
    }

    // const linkToHandler = () => {
    //     if(props.albumSource === 1) {
    //         return ('/new-album?genre=' + props.artistId);
    //     }
    //     else if(props.albumSource === 2) {
    //         return ('/new-album?artist=' + props.genreId);
    //     }
    //     else {
    //         return ('/new-album');
    //     }
    // }

    return (
        <>
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
