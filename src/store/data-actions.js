import { dataSliceActions } from "./data-slice";
import { NotificationManager } from 'react-notifications';
// import { useSelector } from "react-redux";

const FIREBASE_URL = 'https://edpalmeida-my-music-library-1-default-rtdb.firebaseio.com/';

const sortGenresArtists = ( a, b ) => {
    if ( a.name < b.name ){
        return -1;
    }
    if ( a.name > b.name ){
        return 1;
    }
    return 0;
}

const fieldSorter = (fields) => (a, b) => fields.map(o => {
    let dir = 1;
    if (o[0] === '-') { dir = -1; o=o.substring(1); }
    return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
}).reduce((p, n) => p ? p : n, 0);

export const fetchGAAData = () => {
    return async (dispatch) => {

        // const FIREBASE_URL = useSelector(state => state.data.url);

        const fetchData = async () => {
            const response = await fetch(FIREBASE_URL + 'music-library.json');
            
            if(!response.ok) {
                throw new Error('Could not fetch music-library data!');
            }
            
            const data = await response.json();
            return data;
        }
            
        try {
            const data = await fetchData();

            console.log("data.genres.length :: ", data.genres.length);
            console.log("data.artists.length :: ", data.artists.length);
            console.log("data.albums.length :: ", data.albums.length);

            dispatch(dataSliceActions.replaceGAA({
                genres  : data.genres.sort(sortGenresArtists)   || [],
                artists : data.artists.sort(sortGenresArtists)  || [],
                albums  : data.albums.sort(fieldSorter(['artist', 'year', 'title']))   || [],
                genresQty : data.genres.length,
                artistsQty : data.artists.length,
                albumsQty : data.albums.length,
            }));
        } catch(error) {
            NotificationManager.error('Could not retrieve music library data.' , 'Error!', 5000);
        }
    }
}

export const fetchGenreArtistSet = (typeOfDataSet) => {

    return async (dispatch) => {
        
        // const FIREBASE_URL = useSelector(state => state.data.url);
    
        const fetchGAsets = async () => {
            const response = await fetch( FIREBASE_URL +  'music-library/' + typeOfDataSet + '.json');

            if(!response.ok) {
                throw new Error('Could not fetch music-library data!');
            }

            const data = await response.json();

            return data;
        }

        try {
            const data = await fetchGAsets();

            if(typeOfDataSet === 'genres'){

                let genretSet = [];

                for(let i = 0; i < data.length; i++) {
                    genretSet.push({
                        value : data[i].name,
                        label: data[i].name,
                        });
                }

                dispatch(dataSliceActions.replaceGenresSet({
                    genreSet  : genretSet.sort(sortGenresArtists)   || [],
                }));
            }
            else if(typeOfDataSet === 'artists'){

                let artistSet = [];

                for(let i = 0; i < data.length; i++) {
                    artistSet.push({
                            value : data[i].name,
                            label : data[i].name
                        });
                }

                dispatch(dataSliceActions.replaceArtistsSet({
                    artistSet : artistSet.sort(sortGenresArtists)  || [],
                }));
            }
            
        } catch (error) {
            NotificationManager.error('Could not retrieve ' + typeOfDataSet + ' set.' , 'Error!', 5000);
        }
    }
}

export const addGAAitem = (typeOfData, dataGAA) => {

    return async (dispatch) => {
        
        console.log("addGAAitem(", typeOfData, ", ", dataGAA, ")");

        const addItem = async () => {
            let elem = {};

            if(typeOfData === 'genres') {
                elem.id = dataGAA.id;
                elem.mame = dataGAA.name;
                elem.url = dataGAA.url;
            }

            const response = await fetch( FIREBASE_URL +  'music-library/' + typeOfData + '.json', {
                method : 'POST',
                body: JSON.stringify(elem),
                headers: {
                    'Content-Type': 'application/json',
                  }   
            });

            const data = await response.json();

            dispatch(dataSliceActions.incGenresQty)

            console.log("DATA :: ", data);

            if(!response.ok) {
                NotificationManager.error('Could not add ' + typeOfData + "." , 'Error!', 5000);
                // throw new Error('Could not fetch music-library data!');
            }
        }

        try {
            await addItem();

            // dispatch(dataSliceActions.)
        }
        catch(error) {
            NotificationManager.error('Could not add ' + typeOfData + "." , 'Error!', 5000);
        }
    }
}