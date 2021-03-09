import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    
    console.log({type: FETCH_ALL, payload: data});

    dispatch({type: FETCH_ALL, payload: data});
  } catch (error) {
    console.log(error);
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    console.log({type: CREATE, payload: data});

    dispatch({type: CREATE, payload: data});
  } catch (error) {
    console.log(error);
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    console.log({ type: UPDATE, payload: data});

    dispatch({ type: UPDATE, payload: data});
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    console.log({ type: DELETE, payload: id });

    dispatch({ type: DELETE, payload: id})

  } catch (error) {
    console.log(error);
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data }= await api.likePost(id);

    console.log({ type: UPDATE, payload: id });

    dispatch({ type: UPDATE, payload: data});
  } catch (error) {
    console.log(error);
  }
}