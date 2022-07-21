import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/countries";

function countryUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCountries() {
  return http.get(apiEndpoint);
}

export function getCountry(countryId) {
  return http.get(countryUrl(countryId));
}

export function saveMovie(country) {
  if (country._id) {
    const body = { ...country };
    delete body._id;
    return http.put(countryUrl(country._id), body);
  }

  return http.post(apiEndpoint, country);
}

export function deleteMovie(countryId) {
  return http.delete(countryUrl(countryId));
}
