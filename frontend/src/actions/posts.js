import { showLoading, hideLoading } from 'react-redux-loading';
import { _getPosts, _savePost, _deletePost, _votePost } from '../utils/api';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const HANDLE_VOTE_SCORE = 'HANDLE_VOTE_SCORE_POST';
export const HANDLE_COMMENT_COUNT = 'HANDLE_COMMENT_COUNT';

function getPosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

export function handleGetPosts(category) {
  return (dispatch) => {
    dispatch(showLoading());
    return _getPosts(category).then(posts => {
      dispatch(getPosts(posts));
      dispatch(hideLoading());
    });
  }
}

function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function handleAddPost(post) {
  return (dispatch) => {
    post.id = new Date().getTime().toString();
    dispatch(addPost(post));
    return _savePost(post, 'post')
      .catch(() => {
        alert("Error on add post");
        window.location.reload();
      });
  }
}

function editPost(post) {
  return {
    type: EDIT_POST,
    post
  }
}

export function handleEditPost(post) {
  return (dispatch) => {
    dispatch(editPost(post));
    return _savePost(post, 'put')
      .catch(() => {
        alert("Error on edit post");
        window.location.reload();
      });
  }
}

function deletePost(post) {
  return {
    type: DELETE_POST,
    post
  }
}

export function handleDeletePost(post) {
  return (dispatch) => {
    if (window.confirm("Are you sure delete this post?")) {
      dispatch(showLoading());
      dispatch(deletePost(post));
      return _deletePost(post.id)
        .catch(() => {
          alert("Error on delete post");
          window.location.reload();
        });
    }
  }
}

function voteScore(post, option) {
  return {
    post,
    option,
    type: HANDLE_VOTE_SCORE
  }
}

export function handleVoteScore(post, option) {
  return (dispatch) => {
    dispatch(voteScore(post, option));
    return _votePost(post, option)
          .catch(() => {
            alert("Error on vote post");
            window.location.reload();
          });
  };
}

export function handleComment(id, option) {
  return {
    id,
    option,
    type: HANDLE_COMMENT_COUNT
  }
}