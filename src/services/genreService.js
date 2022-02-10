import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/genres";


export function getGenres() {
  return http.get(apiEndpoint);
}

// export function getGenres() {
//   let headers = new Headers();

//   headers.append('Content-Type', 'application/json');
//   headers.append('Accept', 'application/json');
//   headers.append('Access-Control-Allow-Origin', '*');
//   headers.append('Access-Control-Allow-Credentials', 'true');

//   return fetch(apiEndpoint, {
//       mode: 'cors',
//       credentials: 'include',
//       method: 'POST',
//       headers: headers
//   })
//   .then(response => response.json())
//   .then(json => console.log(json))
//   .catch(error => console.log('Authorization failed : ' + error.message));
// }
