import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  REQ_USER_DATA,
} from "./types";


axios.defaults.baseURL = 'http://localhost:5000';
export const submitGarbageData = (gData) => dispatch => {
    console.log(gData);
    axios
      .post("/api/garbageData/garbage", gData)
      .then((response)=> {
        console.log(response);
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err
        })
      );
  }
  export const sendMail = (gData) => dispatch => {
    axios
      .post("/api/sendmail", gData)
      .then((response)=> {
        console.log(response);
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err
        })
      );
  }