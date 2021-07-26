import classes from '../GAA.module.css';


const Artist = (props) => {
    return (
        <li className={classes.quadrado}>
            <img 
                src={props.img_URL}
                alt={props.name}
            />
            <p>{props.name}</p>
        </li>
    )
}

export default Artist
