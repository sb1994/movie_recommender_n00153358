import * as actionTypes from '../actions/actions';
import { updateObject } from '../utility';

const initialState = {
    movie: null,
    error: null, 
    loading: false,
    movies:[]
}

const getMovie = (state, action) => {
    return updateObject(state, {
        movie:action.movie,
        error: null,
        loading: true
    });
}
const getMovies = (state, action) => {
    return updateObject(state, {
        movies:action.movies,
        error: null,
        loading: true
    });
}
const reducer = (state=initialState, action) => {
  switch (action.type) {
      case actionTypes.GET_MOVIE: return getMovie(state, action);
      case actionTypes.GET_MOVIES: return getMovies(state, action);
      default:
          return state;
  }
}
export default reducer;