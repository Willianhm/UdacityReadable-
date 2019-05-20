import { showLoading, hideLoading } from 'react-redux-loading';

import { handleGetCategories } from '../actions/categories';
import { handleGetPosts } from '../actions/posts';

export function handleInitialData(){
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(handleGetCategories());
        dispatch(handleGetPosts(''));
        dispatch(hideLoading());
    }
}