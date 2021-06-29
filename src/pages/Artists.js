import ArtistList from '../components/Artists/ArtistList';

const Artists = (props) => {

    return (
            <ArtistList artists={props.artists} />
    )
}

export default Artists;
