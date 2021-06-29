import classes from './Album.module.css';

const Album = (props) => {
    return (
        <li className={classes.album}>
            <div>
                <h2>{props.artist}</h2>
                <img 
                    src={props.cover}
                    alt={props.title}
                />
                <div>
                    <h2>{props.title}</h2>
                    <h4>{props.year}</h4>
                    <h3>{props.genre}</h3>
                </div>
            </div>
        </li>
    )
}

export default Album;
