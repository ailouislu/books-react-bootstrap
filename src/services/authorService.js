import http from "./httpService";
import url from "../config.json";

const apiEndpoint = url.apiUrl + "/authors";

function authorUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getAuthors() {
  return http.get(apiEndpoint);
}

export function getAuthor(authorId) {
  return http.get(authorUrl(authorId));
}

export function saveAuthor(author) {
  if (author.id) {
    const body = { ...author };
    delete body.id;
    return http.put(authorUrl(author.id), body);
  }

  return http.post(apiEndpoint, author);
}

export function deleteAuthor(authorId) {
  return http.delete(authorUrl(authorId));
}
