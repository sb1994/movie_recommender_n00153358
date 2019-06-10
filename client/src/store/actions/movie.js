import axios from 'axios';
import * as types from './actions';

export const getMovie = id => {
  return {
    type: types.GET_MOVIE
  }
}
export const getMovies =() => {
  return {
    type: types.GET_MOVIES
  }
}