import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Album from './Album';
import AddButton from '../../UI/AddButton';
import classes from '../GAAlist.module.css';
import { fetchGAAData } from '../../store/data-actions';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { dataSliceActions } from '../../store/data-slice';
import Message from '../../components/Message';
import { shortText } from '../../utils/extras';

const AlbumList = (props) => {
    const params = useParams();

    const linkToHandler = () => {
        if(props.albumSource === 1) {
            return ( '/new-album?genre=' + params.genreId );
        }
        else if(props.albumSource === 2) {
            return ( '/new-album?artist=' + params.artistId );
        }
        else {
            return ('/new-album');
        }
    }

    let noAlbumsFound = false;
    let content = null;

    const data = useSelector(state => state.data.albums)
    let filteredData = data;
    
    // GENRES FILTERING
    if(props.albumSource === 1) { 
        filteredData = data.filter( album => album.genre === params.genreId );

        if(filteredData.length === 0) {
            noAlbumsFound = true;
            
            content = (
                <>
                    <Message text="No Albums found for this Genre, please add some."/>
                    <AddButton
                        linkTo  = {linkToHandler}
                        linkText= {"Add Album"}
                        side = {false}
                        />
                </>
            )
        }
    }

    // ARTISTS FILTERING
    if(props.albumSource === 2) { 
        filteredData = data.filter( album => album.artist === params.artistId );

        if(filteredData.length === 0) {
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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGAAData('albums'));
        dispatch(dataSliceActions.cleanCurrAlbum())
    }, [dispatch]);


    return (
        <>
            {
                data ? 
                    <>
                        {noAlbumsFound && content }
                        {!noAlbumsFound && 
                            <>
                                <AddButton
                                    linkTo  = {linkToHandler}
                                    linkText= {"Add Album"}
                                    side = {true}
                                    />
                                <ul className={classes.wrapper}>
                                    {
                                        filteredData.map( (album) => (
                                            <Link 
                                                to  = {`/albums/${album.id}`}
                                                key = { album.id }
                                            >
                                                <Album 
                                                    artist = { album.artist                 }
                                                    cover =  { album.cover                  }
                                                    genre =  { album.genre                  }
                                                    title =  { shortText(album.title, 20)   }
                                                    year  =  { album.year                   }
                                                    />
                                            </Link>
                                        ))
                                    }
                                </ul>
                            </>
                        } 
                    </>
                : <LoadingSpinner />
            }
        </>
    );
}

export default AlbumList;
