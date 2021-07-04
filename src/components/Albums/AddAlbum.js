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
            artist : selectedArtist.label,
            genre : selectedGenre.label,
            year: enteredyear,
        }


        try {
            const response = await fetch('https://edpalmeida-my-music-library-1-default-rtdb.firebaseio.com/albums.json', {
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
                history.push('/');
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
                    pattern="^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&%'\(\)\*\+,;=.]+$"
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
