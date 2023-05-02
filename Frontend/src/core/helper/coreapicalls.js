import { API } from "../../backend";

export const getEvents = () => {
  return fetch(`${API}/events`, { method: "GET" })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getEventById = eventId => {
  return fetch(`${API}/event/${eventId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

