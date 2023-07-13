import {handleError} from '../../api/handleError';
import HTTPS from '../../api/http';
import {SET_AUTH, SET_LOADING, SET_TOKEN, SET_USER} from '../types';

export const setAuthToken = token => {
  HTTPS.defaults.headers.common.Authorization = 'Bearer ' + token;
};

export const register = (dispatch, data) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });

    HTTPS.post('/register', {
      email: data.email.toLowerCase(),
      username: data.username.toLowerCase(),
      password: data.password,
    })
      .then(res => {
        setAuthToken(res.data.token);
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
        dispatch({
          type: SET_AUTH,
          payload: true,
        });
        dispatch({
          type: SET_TOKEN,
          payload: res.data.token,
        });
        dispatch({
          type: SET_USER,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
        reject(handleError(err));
      });
  });

export const login = (dispatch, data) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });

    HTTPS.post('/login', {
      email: data.email.toLowerCase(),
      password: data.password,
    })
      .then(res => {
        setAuthToken(res.data.token);
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
        dispatch({
          type: SET_AUTH,
          payload: true,
        });
        dispatch({
          type: SET_TOKEN,
          payload: res.data.token,
        });
        dispatch({
          type: SET_USER,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
        reject(handleError(err));
      });
  });
