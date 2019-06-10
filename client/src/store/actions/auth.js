import axios from "axios";
import * as types from "./actions";
import { storage } from "../../firebase";

export const startAuth = () => {
  return {
    type: types.START_AUTH
  };
};
export const successAuth = token => {
  return {
    type: types.SUCCESS_AUTH,
    token: token
  };
};
export const successUpload = token => {
  return {
    type: types.SUCCESS_UPLOAD
    // token: token
  };
};
export const failAuth = error => {
  return {
    type: types.FAIL_AUTH,
    error: error
  };
};
export const loginAuth = (username, password) => {
  //alert that the login has started

  return dispatch => {
    dispatch(startAuth());
    axios
      .post("api/users/login/", {
        username: username,
        password: password
      })
      .then(result => {
        const token = result.data.token;
        //sets the expirey date
        const expire = new Date(new Date().getTime() + 10000 * 1000);

        //stores the the token and the expireation date in the browser
        //as a cookie
        localStorage.setItem("token", token);
        dispatch(successAuth(token));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const registerAuth = (
  username,
  password,
  avatar,
  email,
  name,
  bio,
  fav_quote
) => {
  //alert that the register has started
  // console.log(avatar);

  return dispatch => {
    dispatch(startAuth());
    // console.log(avatar);
    
    axios
      .post("api/users/register/", {
        username,
        password,
        avatar,
        email,
        name,
        bio,
        fav_quote
      })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
