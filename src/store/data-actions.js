import { dataSliceActions } from "./data-slice";
import { NotificationManager } from 'react-notifications';
import { fieldSorter } from '../utils/extras';

const FIREBASE_URL = 'https://edpalmeida-my-music-library-1-default-rtdb.firebaseio.com/';

export const fetchGAAData = (typeOfData) => {
    return async (dispatch) => {

        const fetchData = async () => {
            const response = await fetch(FIREBASE_URL + 'music_library/' + typeOfData + '.json');
            
            if(!response.ok) {
                throw new Error('Could not fetch music_library data!');
            }
            
            const data = await response.json();
            
            return data;
        }
        
        try {
            const data = await fetchData();
            
            // PROCESSAR AQUI
            
            const transformedData = [];
            
            for (const key in data) {
                
                transformedData.push({
                    id: key,
                    ...data[key],
                });
            }
            
            if(typeOfData === 'genres') {
                dispatch(dataSliceActions.replaceGenres({
                    genres  : transformedData.sort(fieldSorter(['name']))   || {}
                }));
            }
            else if(typeOfData === 'artists') {
                dispatch(dataSliceActions.replaceArtists({
                    artists  : transformedData.sort(fieldSorter(['name']))   || {}
                }));
            }
            else if(typeOfData === 'albums') { 
                dispatch(dataSliceActions.replaceAlbums({
                    albums  : transformedData.sort(fieldSorter(['artist', 'year', 'title']))   || {}
                }));
            }

        } catch(error) {
            NotificationManager.error('Could not retrieve music library data.' , 'Error!', 5000);
        }
    }
}

export const fetchAlbumData = (albumId) => {
    return async (dispatch) => {

        const fetchAlbum = async () => {
            const response = await fetch(FIREBASE_URL + 'music_library/albums/' + albumId + '.json');

            if(!response.ok) {
                throw new Error('Could not fetch music_library data!');
            }
            
            const data = await response.json();
            
            return data;
        }
    
        try {
            const album = await fetchAlbum(albumId);

            // console.log("albumId :: ", albumId);
            // console.log("album :: ", album);

            dispatch(dataSliceActions.replaceCurrAlbum({
                albumId: albumId,
                albumContent : album
            }));

            return album;

        }
        catch(e){
            NotificationManager.error('Could not retrieve album data.' , 'Error!', 5000);
            // console.log("ERRO :: ", e);
        }
    }
}

export const fetchGenreArtistSet = (typeOfDataSet) => {

    return async (dispatch) => {
        
        const fetchGAsets = async () => {
            const response = await fetch( FIREBASE_URL +  'music_library/' + typeOfDataSet + '.json');

            if(!response.ok) {
                throw new Error('Could not fetch music_library data!');
            }

            const data = await response.json();

            return data;
        }

        try {
            const data = await fetchGAsets();

            if(typeOfDataSet === 'genres'){
                let genretSet = [];

                for (const key in data) {
                    genretSet.push({
                        value : data[key].name,
                        label: data[key].name,
                    });
                }

                dispatch(dataSliceActions.replaceGenresSet({
                    genreSet  : genretSet.sort(fieldSorter(['value'])) || [],
                }));
            }
            else if(typeOfDataSet === 'artists'){
                let artistSet = [];

                for (const key in data) {
                    artistSet.push({
                        value : data[key].name,
                        label: data[key].name,
                    });
                }

                dispatch(dataSliceActions.replaceArtistsSet({
                    artistSet : artistSet.sort(fieldSorter(['value']))  || [],
                }));
            }
            
        } catch (error) {
            NotificationManager.error('Could not retrieve ' + typeOfDataSet + ' set.' , 'Error!', 5000);
        }
    }
}

export const addGAAitem = (typeOfData, dataGAA) => {

    return async () => {
        const addItem = async () => {
            let elem = {...dataGAA};

            const response = await fetch( FIREBASE_URL +  'music_library/' + typeOfData + '.json', {
                method : 'POST',
                body: JSON.stringify(elem),
                headers: {
                    'Content-Type': 'application/json',
                  }
            });

            if(!response.ok) {
                NotificationManager.error('Could not add ' + typeOfData.substring(0, typeOfData.length -1), 'Error!', 5000);
                // throw new Error('Could not fetch music_library data!');
            }

            NotificationManager.success(typeOfData.substring(0, typeOfData.length -1) + ' added', 'Success!', 3000);
        }

        try {
            await addItem();
        }
        catch(error) {
            NotificationManager.error('Could not add ' + typeOfData.substring(0, typeOfData.length -1) , 'Error!', 5000);
        }
    }
}

export const addLike = (albumKey, valor) => {

    return async (dispatch) => {

        const addLikeInc = async () => {

            const response = await fetch( FIREBASE_URL +  'music_library/albums/' + albumKey + '/like.json', {
                method : 'PUT',
                body: JSON.stringify(valor),
                headers: {
                    'Content-Type': 'application/json',
                }   
            });

            if(!response.ok) {
                NotificationManager.error('Could not add like', 'Error!', 5000);
                return;
                // throw new Error('Could not fetch music_library data!');
            }

            dispatch(dataSliceActions.currAlbumLike());

            NotificationManager.success('', 'Like!', 3000);
        }

        try {
            await addLikeInc();
        }
        catch(error) {
            NotificationManager.error('Could not add like!' , 'Error!', 5000);
        }
    }
}

export const addDislike = (albumKey, valor) => {

    return async (dispatch) => {

        const addDislikeInc = async () => {

            const response = await fetch( FIREBASE_URL +  'music_library/albums/' + albumKey + '/dislike.json', {
                method : 'PUT',
                body: JSON.stringify(valor),
                headers: {
                    'Content-Type': 'application/json',
                }   
            });

            if(!response.ok) {
                NotificationManager.error('Could not add dislike', 'Error!', 5000);
                return;
                // throw new Error('Could not fetch music_library data!');
            }

            NotificationManager.success('', 'Dislike!', 3000);
        }

        dispatch(dataSliceActions.currAlbumDislike());
        
        try {
            await addDislikeInc();
        }
        catch(error) {
            NotificationManager.error('Could not add dislike!' , 'Error!', 5000);
        }
    }
}