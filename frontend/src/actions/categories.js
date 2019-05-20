import { showLoading, hideLoading } from 'react-redux-loading';
import { _getCategories } from '../utils/api';

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

function getCategories(categories){
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export function handleGetCategories() {
  return (dispatch) => {
    dispatch(showLoading());
    return _getCategories().then(function (categories){
      dispatch(getCategories(categories));
      dispatch(hideLoading());
    });
  }
}