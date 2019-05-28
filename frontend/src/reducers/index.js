import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import posts from './posts';
import categories from './categories';
import order from './order';
import comments from './comments';
import modal from './modal';

export default combineReducers({
  posts,
  categories,
  order,
  comments,
  modal,
  loadingBar: loadingBarReducer
});