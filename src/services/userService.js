import http from "./httpService";
import url from "../config.json";

const apiEndpoint = url.apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
