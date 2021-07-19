import { useRef } from 'react';
import classes from './AddArtist.module.css'
import validator from 'validator';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { addGAAitem } from '../../store/data-actions';
import { refresh } from '../../utils/extras';


const AddArtist = () => {
    const nameInputRef = useRef('');
    const urlInputRef = useRef('');

    const history = useHistory();

    const artistsDdata = useSelector(state => state.data.artists)
    const dispatch = useDispatch();

    const formSubmitionHandler = async (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredURL = urlInputRef.current.value;

        // VALIDATION

        if(enteredName === '' || enteredURL === '') {
            NotificationManager.warning("empty fields"  , 'Warning!', 5000);
            return;
        }
        else if( !validator.isURL(enteredURL)) {
            NotificationManager.warning("URL is invalid"  , 'Warning!', 5000);
            console.log("URL :: ", enteredURL, " INVALID!");
            return;
        }

        // CHECK IF ARTIST ALREADY EXISTS
        
        const exists = artistsDdata.find( artist => artist.name === enteredName);

        if(exists) {
            NotificationManager.warning("Artist  " + enteredName + " already exists."  , 'Warning!', 5000);
            return;
        }

        // SUBMIT
        
        const elemArtist = {
            name : enteredName,
            url : enteredURL
        }

        dispatch(addGAAitem('artists', elemArtist));
        
        refresh('/artists', history);
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
