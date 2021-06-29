
const AddAlbum = () => {

    async const addAlbumHandler = (albumData) => {

        const response = await fetch('https://react-http-1eb72-default-rtdb.firebaseio.com/music_library.json',{
            method: 'POST',
            body: JSON.stringify(albumData),
            headers: {
                'Content-Type' : 'application/json',
            }
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'Could not create album.');
        }

        return null;
    }

    return (
        <div>
            
        </div>
    )
}

export default AddAlbum;
