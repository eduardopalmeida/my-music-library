import classes from './Genre.module.css';

const Genre = (props) => {
    return (
        <li className={classes.quadradoGenero}>
            <img
                src={props.img_URL}
                alt={props.name}
            />
            <p>{props.name}</p>
        </li>
    )
}

export default Genre;
