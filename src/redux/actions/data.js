import {handleError} from '../../api/handleError';
import HTTPS from '../../api/http';
import {SET_DATA_LOADING, SET_USERS} from '../types';
import {setAuthToken} from './auth';

export const getUsers = (dispatch, token) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: SET_DATA_LOADING,
      payload: true,
    });
    setAuthToken(token);
    HTTPS.post('/')
      .then(res => {
        dispatch({
          type: SET_DATA_LOADING,
          payload: false,
        });
        dispatch({
          type: SET_USERS,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        dispatch({
          type: SET_DATA_LOADING,
          payload: false,
        });
        reject(handleError(err));
      });
  });
