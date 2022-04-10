import http from "./httpService";
import axios from "axios";
import url from "../config.json";

const apiEndpoint = url.apiUrl + "/books";


function bookUrl(id) {
  return `${apiEndpoint}/${id}`;
}

// export function getBooks() {
//   console.log("Data:", http.get(apiEndpoint))
//   return http.get(apiEndpoint);
// }

// export function getBooks() {
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
//   .then(response => response.data)
//   .then(json => console.log(json))
//   .catch(error => console.log('Authorization failed : ' + error.message));
// }

export async function getBooks() {
  let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    // headers.append('Access-Control-Allow-Credentials', 'true');
  let response = axios.get(apiEndpoint, {
    params: {/* whatever data you want to send */ },
    // headers: headers
  });

  // console.log("Books data:", response);
  return response;
}

export function getBook(bookId) {
  return http.get(bookUrl(bookId));
}

export function saveBook(book) {
  if (book.id) {
    const body = {
      ...book
    };
    delete body.id;
    return http.put(bookUrl(book.id), body);
  }

  return http.post(apiEndpoint, book);
}

export function deleteBook(bookId) {
  return http.delete(bookUrl(bookId));
}