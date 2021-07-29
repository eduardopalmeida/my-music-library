import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    genres : [],
    artists : [],
    albums : [],
    genreSet : [],
    artistSet : [],
    currAlbum : {},
    url : 'https://edpalmeida-my-music-library-1-default-rtdb.firebaseio.com/'
}

const dataSlice = createSlice({
    name : 'data',
    initialState,
    reducers : {
        replaceGenres(state, action) {
            state.genres = action.payload.genres;
        },
        replaceArtists(state, action) {
            state.artists = action.payload.artists;
        },
        replaceAlbums(state, action) {
            state.albums = action.payload.albums;
        },
        replaceCurrAlbum(state, action) {
            state.currAlbum = action.payload;
        },
        currAlbumLike(state, action) {
            state.currAlbum = {
                ...state.currAlbum,
                like : state.currAlbum.like + 1
            };
        },
        currAlbumDislike(state, action) {
            state.currAlbum = {
                ...state.currAlbum,
                dislike : state.currAlbum.dislike + 1
            };
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