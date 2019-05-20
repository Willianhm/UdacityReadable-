import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import posts from './posts';
import categories from './categories';
import order from './order';
import comments from './comments';

export default combineReducers({
  posts,
  categories,
  order,
  comments,
  loadingBar: loadingBarReducer
});