import { API } from "../../backend";

//get a user

export const getUserById = userId => {
    return fetch(`${API}/user/${userId}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
};

export const getbalance = walletId => {
  return fetch(`${API}/wallet/${walletId}/balance`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
  

  export const createEvent = (userId, token, event) => {
    return fetch(`${API}/event/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: event
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const registerToEvent = (userId, token, body) => {
    return fetch(`${API}/event/register/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
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
  
  export const getRegisteredEventsByUserId = (userId, token) => {
    return fetch(`${API}/particpates/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
  export const attendedTheEvent = (token, body) => {
    return fetch(`${API}/attended/event`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
