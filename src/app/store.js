import { throttle } from "lodash";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import rootReducer from "./../redux/reducers";
import { loadState, saveState } from "./localStorage";

const middlewares = [thunk];

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(rootReducer, persistedState, applyMiddleware(...middlewares));
  
  store.subscribe(throttle(() => {
    saveState({
      users: store.getState().users
    });
  }, 1000))

  return store;
}

export default configureStore;
