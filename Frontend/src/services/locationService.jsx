import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/locations";

function locationUrl(locationId) {
  return `${apiEndpoint}/${locationId}`;
}

export function getLocations(cityId) {
  return http.get(locationUrl(cityId));
}

export function getLocation(locationId) {
  return http.get(locationUrl(locationId) + "/location");
}

export function getReviews(locationId) {
  return http.get(locationUrl(locationId) + "/reviews");
}

export function addLocationReview(locationId, data) {
  return http.put(locationUrl(locationId) + "/reviews", data);
}

export function deleteLocationReview(locationId, reviewId) {
  return http.delete(locationUrl(locationId) + `/reviews/${reviewId}`);
}
