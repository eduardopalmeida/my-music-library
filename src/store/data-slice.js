import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    genres : [],
    artists : [],
    albums : [],
    genreSet : [],
    artistSet : [],
    genresQty : 0,
    artistsQty : 0,
    albumsQty : 0,
    url : 'https://edpalmeida-my-music-library-1-default-rtdb.firebaseio.com/'
}

const dataSlice = createSlice({
    name : 'data',
    initialState,
    reducers : {
        replaceGAA(state, action) {
            state.musicLibrary = action.payload;
            state.genres = action.payload.genres;
            state.artists = action.payload.artists;
            state.albums = action.payload.albums;
        },
        replaceGenresSet(state, action) {
            state.genreSet = action.payload.genreSet;
        },
        replaceArtistsSet(state, action) {
            state.artistSet = action.payload.artistSet;
        },
        incGenresQty  (state,action) { state.genresQty++;   },
        decGenresQty  (state,action) { state.genresQty--;   },
        incArtistsQty (state,action) { state.artistsQty++;  },
        decArtistsQty (state,action) { state.artistsQty--;  },
        incAlbumsQty  (state,action) { state.albumsQty++;   },
        decAlbumsQty  (state,action) { state.albumsQty--;   },
    }
});
    
export const dataSliceActions = dataSlice.actions;

export default dataSlice;