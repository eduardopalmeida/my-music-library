import { useRef } from 'react';
import classes from './AddGenre.module.css'
import validator from 'validator';
import { useHistory } from 'react-router-dom';

const AddGenre = () => {
    const nameInputRef = useRef('');
    const urlInputRef = useRef('');

    const history = useHistory(); 

    const formSubmitionHandler = async (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredURL = urlInputRef.current.value;

        // VALIDATION

        if(enteredName === '' || enteredURL === '') {
            return;
        }
        else if( !validator.isURL(enteredURL)) {
            console.log("URL :: ", enteredURL, " INVALID!");
            return;
        }

        // CHECK IF GENRE ALREADY EXISTS
        
        // SUBMIT
        
        const elemGenre = {
            name : enteredName,
            url : enteredURL
        }

        try {
            const response = await fetch('https://edpalmeida-my-music-library-1-default-rtdb.firebaseio.com/genres.json', {
                method : 'POST',
                body: JSON.stringify(elemGenre),
                headers: {
                    'Content-Type': 'application/json',
                  }    
            })

            const data = await response.json();
          
            if (!response.ok) {
              throw new Error(data.message || 'Could not create artist.');
            }
            else {
                history.push('/genres');
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <form className={classes.formbox} onSubmit={formSubmitionHandler}>
            <div className="form-control">
                <label htmlFor='name'>Genre name</label>
                <input
                    type='text'
                    id='name'
                    ref={nameInputRef}
                    placeholder='Aretha Franklin'
                    required
                ></input>
            </div>
            <div className="form-control">
                <label htmlFor='name'>Genre image URL</label>
                <input
                    type='text'
                    id='url'
                    ref={urlInputRef}
                    placeholder='https://example.com/genre.jpg'
                    pattern="^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                    required
                ></input>
            </div>
            <div className="form-actions">
                <button className={classes.btn}>Submit</button>
            </div>            
        </form>
    )
}

export default AddGenre
