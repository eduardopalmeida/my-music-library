import classes from './Artist.module.css';

const Artist = (props) => {
    return (
        <li className={classes.quadradoArtista}>
            <img 
                src={props.img_URL}
                alt={props.name}
            />
            <p>{props.name}</p>
        </li>
    )
}

export default Artist
