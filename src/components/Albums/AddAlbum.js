import { useRef, useState } from 'react';
import classes from './AddAlbum.module.css'
import validator from 'validator';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

const AddAlbum = (props) => {
    const titleInputRef = useRef();
    const urlInputRef = useRef();
    const yearInputRef = useRef();

    const [selectedArtist, setSelectedArtist] = useState({});
    const [selectedGenre, setSelectedGenre] = useState({});

    const history = useHistory(); 

    console.log("GENREOS :: ",  props.genres);
    console.log("ARTISTS :: ",  props.artists);

    const formSubmitionHandler = async (event) => {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredURL = urlInputRef.current.value;
        const enteredyear = yearInputRef.current.value;


        // VALIDATION

        if(enteredTitle === '' || enteredURL === '') {
            return;
        }
        else if( !validator.isURL(enteredURL)) {
            console.log("URL :: ", enteredURL, " INVALID!");
            return;
        }
        
        // SUBMIT
        
        const elemAlbum = {
            title : enteredTitle,
            cover : enteredURL,
            artist : selectedArtist.value,
            genre : selectedGenre.value,
            year: enteredyear
        }

        console.log("elemAlbum :: ", elemAlbum);

        try {
            const response = await fetch('https://react-http-1eb72-default-rtdb.firebaseio.com/music_library.json', {
                method : 'POST',
                body: JSON.stringify(elemAlbum),
                headers: {
                    'Content-Type': 'application/json',
                  }    
            })

            const data = await response.json();
          
            if (!response.ok) {
              throw new Error(data.message || 'Could not create album.');
            }
            else {
                history.push('/albums');
            }
        }
        catch(error) {
            console.log(error);
        }
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
                    pattern="^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                    required
                ></input>
            </div>

            <div className="form-control">
                <label htmlFor='artist'>Artist</label>
                <Select 
                    options={props.artists} 
                    onChange={setSelectedArtist}
                    required
                    />
            </div>

            <div className="form-control">
                <label htmlFor='genre'>Genre</label>
                <Select 
                    options={props.genres} 
                    onChange={setSelectedGenre}
                    required
                />
            </div>

            <div className="form-control">
                <label htmlFor='name'>Release Year</label>
                <input
                    type='number'
                    min={1000}
                    max={9999}                    
                    id='year'
                    ref={yearInputRef}
                    placeholder='YYYY'
                    pattern='^\d{4}$'
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
