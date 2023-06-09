import { API } from "../../backend";

//category calls
export const createaEvent = (userId, token, event) => {
  return fetch(`${API}/event/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: event
  }).then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getEvents = () => {
    return fetch(`${API}/events`, { method: "GET" })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
};

export const getEvent = (eventId) => {
  return fetch(`${API}/event/${eventId}`, { method: "GET" })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getBlocks = () => {
    return fetch(`${API}/blocks`, { method: "GET" })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
}

export const getTransactions = () => {
    return fetch(`${API}/transactions`, { method: "GET" })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
}

export const getEventAttendeesByEventId = (eventId) => {
  return fetch(`${API}/particpates/event/${eventId}`, {
    method: "GET",
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

//get all categories
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getAllAchievement = () => {
  return fetch(`${API}/achievements`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteEvent = (eventId, userId, token) => {
  return fetch(`${API}/event/${eventId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


// //products calls

// //create a product
// export const createaProduct = (userId, token, product) => {
//   return fetch(`http://localhost:3000/api/product/create/${userId}`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: product
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };

// //get all products
// export const getProducts = () => {
//   return fetch(`http://localhost:3000/api/products`, {
//     method: "GET"
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };

// //delete a product

// export const deleteProduct = (productId, userId, token) => {
//   return fetch(`http://localhost:3000/api/product/${productId}/${userId}`, {
//     method: "DELETE",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`
//     }
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };

// //get a product

// export const getProduct = productId => {
//   return fetch(`http://localhost:3000/api/product/${productId}`, {
//     method: "GET"
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };

// //update a product

export const updateEvent = (eventId, userId, token, formData) => {
  return fetch(`${API}/event/${eventId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
    .then(response => {
      if (response.status !== 200) {
        throw new Error("Failed to update event");
      }
      return response.json();
    })
    .catch(err => console.log(err));
};
