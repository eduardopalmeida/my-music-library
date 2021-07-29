import { useRef, useState } from 'react';
import classes from './AddAlbum.module.css'
import validator from 'validator';
import { useHistory, useLocation } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { addGAAitem } from '../../store/data-actions';
import { refresh } from '../../utils/extras';

const AddAlbum = (props) => {

    const titleInputRef = useRef();
    const urlInputRef = useRef();
    const yearInputRef = useRef();

    const history = useHistory();

    const [selectedArtist, setSelectedArtist] = useState({});
    const [selectedGenre, setSelectedGenre] = useState({});

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const artistSelected = queryParams.get('artist');
    const genreSelected = queryParams.get('genre');
    
    let queriedGenre = null;
    let queriedArtist = null;

    const albumsDdata = useSelector(state => state.data.albums)
    const genreSet = useSelector(state => state.data.genreSet);
    const artistSet = useSelector(state => state.data.artistSet);
    const dispatch = useDispatch();
    
    // DOES THE QUERIED ARTIST/GENRE EXIST?
    
    for (let i = 0; i < genreSet.length; i++) {
        if( genreSelected === (genreSet[i]).value ) {
            queriedGenre =  genreSet[i];
        }
        // else {
        //     NotificationManager.warning("queried genre does not exist"  , 'Warning!', 5000);
        // }
    }
    
    for (let i = 0; i < artistSet.length; i++) {
        if( artistSelected === (artistSet[i]).value) {
            queriedArtist = artistSet[i];
        }
        // else {
        //     NotificationManager.warning("queried artist does not exist"  , 'Warning!', 5000);
        // }
    }
    
    const formSubmitionHandler = async (event) => {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredURL = urlInputRef.current.value;
        const enteredyear = yearInputRef.current.value;

        // VALIDATION

        if(enteredTitle === '' || enteredURL === '' || enteredyear === '')  {
            NotificationManager.warning("empty fields"  , 'Warning!', 5000);
            return;
        }
        else if( !validator.isURL(enteredURL)) {
            NotificationManager.warning("URL is invalid"  , 'Warning!', 5000);
            console.log("URL :: ", enteredURL, " INVALID!");
            return;
        }
        
        // CHECK IF ALBUM ALREADY EXISTS
        const exists = albumsDdata.find( album => album.name === enteredTitle);

        if(exists) {
            NotificationManager.warning("Album  " + enteredTitle + " already exists."  , 'Warning!', 5000);
            return;
        }
              
        // SUBMIT
        
        const elemAlbum = {
            title :  enteredTitle,
            cover :  enteredURL,
            genre :  queriedGenre  ? queriedGenre.label  : selectedGenre.label,
            artist : queriedArtist ? queriedArtist.label : selectedArtist.label,
            year: enteredyear,
            like: 0,
            dislike: 0
        }

        dispatch(addGAAitem('albums', elemAlbum));
        refresh('/albums', history);
    }

    return (
        <form className={classes.formbox} onSubmit={formSubmitionHandler}>
            <div className="form-control">
                <label htmlFor='title'>Album title</label>
                <input
                    type='text'
                    id='title'
                    ref={titleInputRef}
                    placeholder='Aretha Franklin'
                    required
                ></input>
            </div>
            <div className="form-control">
                <label htmlFor='cover'>Album image URL</label>
                <input
                    type='text'
                    id='url'
                    ref={urlInputRef}
                    placeholder='https://example.com/album.jpg'
                    pattern="^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&%'\(\)\*\+,;=.]+$"
                    required
                ></input>
            </div>
            <div className="form-control">
                <label htmlFor='artist'>Artist</label>
                <Select 
                    options={artistSet} 
                    onChange={setSelectedArtist}
                    defaultValue={ queriedArtist ? queriedArtist : null }
                    required
                    />
            </div>
            <div className="form-control">
                <label htmlFor='genre'>Genre</label>
                <Select 
                    options={genreSet} 
                    onChange={setSelectedGenre}
                    defaultValue={ queriedGenre ? queriedGenre : null }
                    required
                />
            </div>
            <div className="form-control">
                <label htmlFor='name'>Release Year</label>
                <input
                    type='number'
                    min={1900}
                    max={2099}
                    id='year'
                    ref={yearInputRef}
                    placeholder='YYYY'
                    pattern='^(19|20)\d{2}$'
                    required
                ></input>
            </div>
            <div className="form-actions">
                <button className={classes.btn}>Submit</button>
            </div>            
        </form>
    )
}

export default AddAlbum;
