import { showLoading, hideLoading } from 'react-redux-loading';
import { _getComments, _saveComment, _deleteComment, _voteComment } from '../utils/api';

import { handleComment } from '../actions/posts';

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const HANDLE_VOTE_SCORE = "HANDLE_VOTE_SCORE_COMMENT";

function getComments(comments){
    return {
        comments,
        type: RECEIVE_COMMENTS
    }
}

export function handleGetComments(postId) {
    return (dispatch) => {
        dispatch(showLoading());
        return _getComments(postId).then(comments => {
            dispatch(getComments(comments));
            dispatch(hideLoading());
        });
    }
}

function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function handleAddComment(comment) {
    return (dispatch) => {
        comment.id = new Date().getTime().toString();
        dispatch(addComment(comment));
        dispatch(handleComment(comment.parentId, 'upComment'));
        return _saveComment(comment, 'post')
            .catch(() => {
                alert("Error on add comment");
            });
    }
}

function editComment(comment) {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

export function handleEditComment(comment) {
    return (dispatch) => {
        dispatch(editComment(comment));
        return _saveComment(comment, 'put')
            .catch(() => {
                alert("Error on edit comment");
            });
    }
}

function deleteComment(comment) {
    return {
      type: DELETE_COMMENT,
      comment
    }
}

export function handleDeleteComment(comment){
    return (dispatch) => {
        if (window.confirm("Are you sure delete this comment?")) {
            dispatch(deleteComment(comment));
            dispatch(handleComment(comment.parentId, 'downComment'));
            return _deleteComment(comment.id)
                .catch(() => {
                    alert("Error on delete comment");
                });
        }
    }
}

function voteScore(comment, option){
    return {
        comment,
        option,
        type: HANDLE_VOTE_SCORE
    }
}

export function handleVoteScore(comment, option) {
    return (dispatch) => {
        dispatch(voteScore(comment, option));
        return _voteComment(comment, option)
            .catch(() => {
                alert("Error on vote comment");
            });
    };
}