import { 
  RECEIVE_COMMENTS, 
  ADD_COMMENT, 
  EDIT_COMMENT,
  DELETE_COMMENT, 
  HANDLE_VOTE_SCORE 
} from '../actions/comments';

export default function comments(state = [], action) {
  const { comment, option } = action;
  let list = [];
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return [
        ...action.comments
      ]
    case ADD_COMMENT:
      return [
        ...state,
        comment
      ];
    case EDIT_COMMENT:
        list = state.map(c => {
        if(c.id === comment.id){
          c = { ...comment };
        }
        return c;
      });
      return [
        ...list
      ];
    case DELETE_COMMENT:
      list = state.filter(c => c.id !== comment.id);
      return [
        ...list
      ];
    case HANDLE_VOTE_SCORE:
      comment.voteScore = option === 'upVote' ? comment.voteScore + 1 : comment.voteScore - 1;
      state[state.indexOf(comment)] = { ...comment };
      return [
        ...state
      ]
    default:
      return state
  }
}