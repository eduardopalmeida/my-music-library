import classes from '../GAA.module.css';

const Album = (props) => {
    return (
        <li className={classes.album}>
            <div>
                <h3>{props.artist}</h3>
                <img 
                    src={props.cover}
                    alt={props.title}
                />
                <div>
                    <h3>{props.title}</h3>
                    <h5>{props.year}</h5>
                    <h4>{props.genre}</h4>
                </div>
            </div>
        </li>
    )
}

export default Album;
