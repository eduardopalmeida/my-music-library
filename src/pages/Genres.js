import GenreList from "../components/Genres/GenreList"

const Genres = (props) => {

    return (
            <GenreList genres={props.genres} />
    )
}

export default Genres;
