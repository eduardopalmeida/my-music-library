import {createStore} from 'redux';

const musicLibraryReducer = (state = {starQuantity: 0} , action) => {

    if(action.type === 'incrementStars') {
        return {
            starQuantity : state.starQuantity + 1
        }
    }

    return state;
}

const store = createStore(musicLibraryReducer);

export default store;