import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const KEY = 'api_key=70ab5ff9a09f1c278ef8216a2fd19a52';

export const getTrend = () => {
  return axios.get(`/trending/movie/day?${KEY}`);
};

export const getOneMovie = (id) => {
  return axios.get(`/movie/${id}?${KEY}`);
};

export const getByQuery = (query) => {
  return axios.get(
    `/search/movie?${KEY}&query=${query}&page=1&include_adult=false`
  );
};

export const getCast = (id) => {
  return axios.get(`/movie/${id}/credits?${KEY}`);
};

export const getReview = (id) => {
  return axios.get(`/movie/${id}/reviews?${KEY}&page=1`);
};
