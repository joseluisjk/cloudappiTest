import { combineReducers } from "redux";
import { getUsers, userDetails } from "./Users";

export default combineReducers({ getUsers, userDetails });
