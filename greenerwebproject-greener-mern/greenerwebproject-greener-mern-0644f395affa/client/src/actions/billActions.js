import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  REQ_USER_DATA,
} from "./types";


axios.defaults.baseURL = 'http://localhost:5000';


export const submitBill = (billData) => dispatch => {
    axios
      .post("/api/billData/submitbill", billData)
      .then((response)=> {
        console.log(response);
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err
        })
      );
  };

  
  export const getBillData = (userid) => dispatch => {
      axios
      .get("/api/billData/submitbill",{
        params: {
          id: userid
        }
    })
      .then((response) => dispatch => ({
        type: REQ_USER_DATA,
        payload: response.data
        //   return response.data;
      }))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err
        })
      );
  }