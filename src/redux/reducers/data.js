import * as types from '../types';

import {initialState} from './initialState';

export default function (state = initialState.data, action) {
  switch (action.type) {
    case types.SET_USERS:
      return {...state, users: action.payload};
    case types.SET_DATA_LOADING:
      return {...state, loading: action.payload};
    default:
      return state;
  }
}
