import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddButton from '../../UI/AddButton';
import Genre from "./Genre";
import classes from './GenreList.module.css';

const GenreList = () => {
    
    const data = useSelector(state => state.data.genres)
        
    return (
        <>
            <AddButton
                linkTo  ={'/new-genre'}
                linkText= {"Add Genre"}
                side = {true}
            />
            <ul className={classes.wrapper}>
                {
                    data.map( (genre) => (
                        <Link 
                            to  = {`/genres/${genre.name}`}
                            key = { genre.id }
                        >
                            <Genre 
                                key     = {genre.id}
                                name    = {genre.name}
                                img_URL = {genre.url}
                            />
                        </Link>
                    ))
                }
            </ul>
        </>
    )
}

export default GenreList
