import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/cities";

function cityUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCities() {
  return http.get(apiEndpoint);
}

export function getCountryCities(countryId) {
  return http.get(apiUrl + `/cities/country/${countryId}`);
}

export function getCity(cityId) {
  return http.get(cityUrl(cityId));
}

export function deleteMovie(cityId) {
  return http.delete(cityUrl(cityId));
}
