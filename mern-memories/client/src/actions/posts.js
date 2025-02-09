import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({type: FETCH_ALL, payload: data});
  } catch (error) {
    console.log(error);
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({type: CREATE, payload: data});
  } catch (error) {
    alert("You need to login again");
    window.location.reload();
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data});
  } catch (error) {
    alert("You need to login again");
    window.location.reload();
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id})

  } catch (error) {
    alert("You need to login again");
    window.location.reload();
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data }= await api.likePost(id);
    dispatch({ type: UPDATE, payload: data});
  } catch (error) {
    alert("You need to login again");
    window.location.reload();
  }
}