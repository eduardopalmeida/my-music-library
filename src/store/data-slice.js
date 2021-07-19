import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    genres : [],
    artists : [],
    albums : [],
    genreSet : [],
    artistSet : [],
    url : 'https://edpalmeida-my-music-library-1-default-rtdb.firebaseio.com/'
}

const dataSlice = createSlice({
    name : 'data',
    initialState,
    reducers : {
        replaceGAA(state, action) {
            state.genres        = action.payload.genres;
            state.artists       = action.payload.artists;
            state.albums        = action.payload.albums;
        },
        replaceGenres(state, action) {
            state.genres = action.payload.genres;
        },
        replaceArtists(state, action) {
            state.artists = action.payload.artists;
        },
        replaceAlbums(state, action) {
            state.albums = action.payload.albums;
        },
        replaceGenresSet(state, action) {
            state.genreSet = action.payload.genreSet;
        },
        replaceArtistsSet(state, action) {
            state.artistSet = action.payload.artistSet;
        },
    }
});
    
export const dataSliceActions = dataSlice.actions;

export default dataSlice;