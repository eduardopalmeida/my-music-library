import { Link } from 'react-router-dom';
import classes from './AddButton.module.css';

const AddButton = (props) => {

    return (
        <div className={ props.side ? classes.btnAddAlbumRight : classes.btnAddAlbumCenter}>
            <Link 
                className='btn'
                to  = {props.linkTo}
            >{props.linkText}
            </Link>
        </div>
    )
}

export default AddButton;
