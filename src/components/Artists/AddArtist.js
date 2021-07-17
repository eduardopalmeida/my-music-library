import { useRef } from 'react';
import classes from './AddArtist.module.css'
import validator from 'validator';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';

const AddArtist = () => {
    const nameInputRef = useRef('');
    const urlInputRef = useRef('');

    const FIREBASE_URL = useSelector(state => state.data.url);

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

        // CHECK IF ARTIST ALREADY EXISTS
        
        // SUBMIT
        
        const elemArtist = {
            name : enteredName,
            url : enteredURL
        }

        try {
            const response = await fetch( FIREBASE_URL + '/artists.json', {
                method : 'POST',
                body: JSON.stringify(elemArtist),
                headers: {
                    'Content-Type': 'application/json',
                  }    
            })

            const data = await response.json();
          
            if (!response.ok) {
                throw new Error(data.message || 'Could not create artist.');
            }
            else {
                NotificationManager.success('Artist added.', 'Success!', 3000);
                history.push('/artists');
            }
        }
        catch(error) {
            NotificationManager.error('Something went wrong! \n Artist not added.', 'Error!', 5000);
            console.log(error);
        }
    }

    return (
        <> 
            <form className={classes.formbox} onSubmit={formSubmitionHandler}>
                <div className="form-control">
                    <label htmlFor='name'>Artist name</label>
                    <input
                        type='text'
                        id='name'
                        ref={nameInputRef}
                        placeholder='Aretha Franklin'
                        required
                    ></input>
                </div>
                <div className="form-control">
                    <label htmlFor='name'>Artist image URL</label>
                    <input
                        type='text'
                        id='url'
                        ref={urlInputRef}
                        placeholder='https://example.com/artist.jpg'
                        pattern="^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                        required
                    ></input>
                </div>
                <div className="form-actions">
                    <button className={classes.btn}>Submit</button>
                </div>            
            </form>
        </>
    )
}

export default AddArtist;
