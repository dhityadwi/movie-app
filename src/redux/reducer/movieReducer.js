const initialState = {
  movie: [],
  loadingMov: false,
  errorMov: false,
  message: "",
};

const getMoviereducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MOVIE":
      return {
        ...state,
        movie: action.payload.movie,
        loadingMov: false,
      };
    case "GET_MOVIE/START":
      return {
        ...state,
        loadingMov: true,
      };
    case "GET_MOVIE/ERROR":
      return {
        ...state,
        loadingMov: false,
        errorMov: true,
        message: action.payload.message,
      };
    default:
      return state;
  }
};
