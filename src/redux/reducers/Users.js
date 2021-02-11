const initialState = {
  loading: false,
  error: "",
  data: {},
  details: {}
}

export function getUsers(state = initialState, action) {
  switch(action.type) {
    case "GET_USERS_START":
      return {
        ...state,
        loading: true,
        error: ""
      }
    case "GET_USERS_END":
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case "GET_USERS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}

export function userDetails(state = initialState, action) {
  switch(action.type) {
    case "GET_USER_DETAILS_START":
      return {
        ...state,
        loading: true,
        error: ""
      }
    case "GET_USER_DETAILS_END":
      return {
        ...state,
        loading: false,
        details: action.payload
      }
    case "GET_USER_DETAILS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
