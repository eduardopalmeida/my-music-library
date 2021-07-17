import AlbumList from '../components/Albums/AlbumList'

const Albums = (props) => {
    
    return ( 
        <AlbumList albumSource={props.albumSource} /> 
    );
}

export default Albums;
