import http from "./httpService";
import { apiUrl } from "../config.json";
import auth from "./authService";

const apiEndpoint = apiUrl + "/users";

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

export function getCurrentUserName() {
  return http.get(apiUrl + "/users/me");
}

export function getUserCountries() {
  return http.get(apiEndpoint + `/locations/${auth.getCurrentUser()._id}`);
}

export function getUserCities() {
  return http.get(apiEndpoint + `/cities/${auth.getCurrentUser()._id}`);
}

export function getUserLocations() {
  return http.get(apiEndpoint + `/locations/${auth.getCurrentUser()._id}`);
}

export function getWishlist() {
  return http.get(apiEndpoint + `/wishlist/${auth.getCurrentUser()._id}`);
}

export function handleCityPref(city) {
  return http.put(apiEndpoint + `/cities/${auth.getCurrentUser()._id}`, city);
}

export function handleLocationPref(location) {
  return http.put(apiEndpoint + `/locations/${auth.getCurrentUser()._id}`, location);
}
