import { CHANGE_ORDER } from '../actions/order'

const INITIAL_DATA = 'voteScore';

export default function order(state = INITIAL_DATA, action) {
  switch (action.type) {
    case CHANGE_ORDER:
      return action.order;
    default:
      return state
  }
}