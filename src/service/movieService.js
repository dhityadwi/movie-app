import axios from "axios";

export const getMovie = async ({ query }) => {
  const API_KEY = "faf7e5bb";
  const url = `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;

  try {
    const response = await axios(url, {
      method: "get",
    });
    console.log(response);
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
