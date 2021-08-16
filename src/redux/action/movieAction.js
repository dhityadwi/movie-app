import { getMovie } from "../../service/movieService";

export const isGetMovieStart = () => {
  return {
    type: "GET_MOVIE/START",
  };
};

export const isGetMovie = (data) => {
  return {
    type: "GET_MOVIE",
    payload: {
      movie: data,
    },
  };
};

export const isGetMovieError = (message) => {
  return {
    type: "GET_MOVIE/ERROR",
    payload: {
      message,
    },
  };
};

export const movieAsynsc = () => {
  return (dispatch) => {
    dispatch(isGetMovieStart());

    getMovie()
      .then((response) => {
        dispatch(isGetMovie(response.data));
      })
      .catch((error) => {
        dispatch(isGetMovieError(error.message));
      });
  };
};
