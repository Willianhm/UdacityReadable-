import {
  RECEIVE_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  HANDLE_VOTE_SCORE,
  HANDLE_COMMENT_COUNT
} from '../actions/posts'

export default function posts(state = [], action) {
  const { id, post, option } = action;
  let list = [];
  switch (action.type) {
    case RECEIVE_POSTS:
      return [
        ...state,
        ...action.posts
      ];
    case ADD_POST:
      return [
        ...state,
        post
      ];
    case EDIT_POST:
      list = state.map(p => {
        if (p.id === post.id) {
          return post;
        }
        return p;
      });
      return list;
    case DELETE_POST:
      list = state.filter(p => p.id !== post.id);
      return [
        ...list
      ];
    case HANDLE_VOTE_SCORE:
      post.voteScore = option === 'upVote' ? post.voteScore + 1 : post.voteScore - 1;
	  return state.map(statePost => {
		if (statePost.id === post.id) {
			return post
		}
		return statePost
	})
    case HANDLE_COMMENT_COUNT:
      list = state.map(p => {
        if (p.id === id) {
          p.commentCount = option === 'upComment' ? p.commentCount + 1 : p.commentCount - 1;
          p = { ...p };
        }
        return p;
      });
      return [
        ...list
      ]
    default:
      return state
  }
}