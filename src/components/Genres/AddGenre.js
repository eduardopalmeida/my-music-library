import { useRef } from 'react';
import classes from './AddGenre.module.css'
import validator from 'validator';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { addGAAitem } from '../../store/data-actions';

const AddGenre = () => {
    const nameInputRef = useRef('');
    const urlInputRef = useRef('');

    const history = useHistory(); 

    const genresDdata = useSelector(state => state.data.genres)
    const genresQty = useSelector(state => state.data.genresQty) + 1;
    const dispatch = useDispatch();


    const formSubmitionHandler = async (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredURL = urlInputRef.current.value;

        // VALIDATION

        if(enteredName === '' || enteredURL === '') {
            return;
        }
        else if( !validator.isURL(enteredURL)) {
            NotificationManager.error("The URL you've entereappears to be invalid." , 'Error!', 5000);

            return;
        }

        // CHECK IF GENRE ALREADY EXISTS

        const exists = genresDdata.find( genre => genre.name === enteredName);

        if(exists) {
            NotificationManager.warning("Genre " + enteredName + " already exists."  , 'Warning!', 5000);
            history.push('/genres');
            return;
        }
        
        // SUBMIT
        
        const elemGenre = {
            id : genresQty,
            name : enteredName,
            url : enteredURL
        }

        dispatch(addGAAitem('genres', elemGenre));
        history.push('/genres');

        // try {
        //     const response = await fetch(FIREBASE_URL + 'genres.json', {
        //         method : 'POST',
        //         body: JSON.stringify(elemGenre),
        //         headers: {
        //             'Content-Type': 'application/json',
        //           }    
        //     })

        //     // const data = await response.json();
          
        //     if (!response.ok) {
        //         NotificationManager.error("Could not create artist." , 'Error!', 5000);
        //         // throw new Error(data.message || 'Could not create artist.');
        //     }
        //     else {
        //         history.push('/genres');
        //     }
        // }
        // catch(error) {
        //     console.log(error);
        // }


    }

    return (
        <form className={classes.formbox} onSubmit={formSubmitionHandler}>
            <div className="form-control">
                <label htmlFor='name'>Genre name</label>
                <input
                    type='text'
                    id='name'
                    ref={nameInputRef}
                    placeholder='Pop/Rock'
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
