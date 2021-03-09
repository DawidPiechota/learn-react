import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (data, history) => async (dispatch) => {
  try {
    // log user in 
    history.push('/');
  } catch (error) {
    console.log(error);
  }
}

export const signup = (data, history) => async (dispatch) => {
  try {
    // sign user up
    history.push('/');
  } catch (error) {
    console.log(error);
  }
}