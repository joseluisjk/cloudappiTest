import axios from 'axios';

function getUsersStart() {
  return {
      type: "GET_USERS_START"
  }
}

function getUsersEnd(payload) {
  return {
      type: "GET_USERS_END",
      payload: payload
  }
}

function getUsersError(error) {
  return {
      type: "GET_USERS_ERROR",
      error: error
  }
}

export function getUsers() {
  return async dispatch => {
    dispatch(getUsersStart());
    try {
      const res = await axios.get(
        'https://my-json-server.typicode.com/joseluisjk/cloudappiTestApi/users'
      );
      if (res.error) {
        throw (res.error);
      } else {
        dispatch(getUsersEnd(res.data));
        return res.data;
      }
    } catch (error) {
      dispatch(getUsersError(error));
    }
  }
}


function getUserDetailsStart() {
  return {
      type: "GET_USER_DETAILS_START"
  }
}

function getUserDetailsEnd(payload) {
  return {
      type: "GET_USER_DETAILS_END",
      payload: payload
  }
}

function getUserDetailsError(error) {
  return {
      type: "GET_USER_DETAILS_ERROR",
      error: error
  }
}

export function userDetails(id) {
  return async dispatch => {
    dispatch(getUserDetailsStart());
    try {
      const res = await axios.get(
        `https://my-json-server.typicode.com/joseluisjk/cloudappiTestApi/users/${id}`,
      );
      if (res.error) {
        throw (res.error);
      } else {
        dispatch(getUserDetailsEnd(res.data));
        return res.data;
      }
    } catch (error) {
      dispatch(getUserDetailsError(error));
    }
  }
}


function deleteUserStart() {
  return {
      type: "DELETE_USER_START"
  }
}

function deleteUserEnd() {
  return {
      type: "DELETE_USER_END"
  }
}

function deleteUserError(error) {
  return {
      type: "DELETE_USER_ERROR",
      error: error
  }
}

export function deleteUser(id) {
  return async dispatch => {
    dispatch(deleteUserStart());
    try {
      const res = await axios.delete(
        `https://my-json-server.typicode.com/joseluisjk/cloudappiTestApi/users/${id}`,
      );
      if (res.error) {
        throw (res.error);
      } else {
        dispatch(deleteUserEnd());
      }
    } catch (error) {
      dispatch(deleteUserError(error));
    }
  }
}

function updateUserStart() {
  return {
      type: "UPDATE_USER_START"
  }
}

function updateUserEnd() {
  return {
      type: "UPDATE_USER_END"
  }
}

function updateUserError(error) {
  return {
      type: "UPDATE_USER_ERROR",
      error: error
  }
}

export function updateUser(id,data) {
  return async dispatch => {
    dispatch(updateUserStart());
    try {
      const res = await axios.put(
        `https://my-json-server.typicode.com/joseluisjk/cloudappiTestApi/users/${id}`,
        {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          birthdate: data.birthdate,
          address: {
            country: data.country,
            city: data.city,
            street: data.street,
            postalcode: data.postalcode
          }
        },
        {headers: {"Content-Type": "application/json"}}
      );
      if (res.error) {
        throw (res.error);
      } else {
        dispatch(updateUserEnd());
      }
    } catch (error) {
      dispatch(updateUserError(error));
    }
  }
}

function createUserStart() {
  return {
      type: "CREATE_USER_START"
  }
}

function createUserEnd() {
  return {
      type: "CREATE_USER_END"
  }
}

function createUserError(error) {
  return {
      type: "CREATE_USER_ERROR",
      error: error
  }
}

export function createUser(data) {
  return async dispatch => {
    dispatch(createUserStart());
    try {
      const res = await axios.post(
        'https://my-json-server.typicode.com/joseluisjk/cloudappiTestApi/users',
        {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          birthdate: data.birthdate,
          address: {
            country: data.country,
            city: data.city,
            street: data.street,
            postalcode: data.postalcode
          }
        }
      );
      if (res.error) {
        throw (res.error);
      } else {
        dispatch(createUserEnd());
      }
    } catch (error) {
      dispatch(createUserError(error));
    }
  }
}
