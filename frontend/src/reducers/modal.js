import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal'

const INITIAL_DATA = {
    param: null,
    isOpen: false
};

export default function order(state = INITIAL_DATA, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
          param: { ...action.param },
          isOpen: true
      };
    case CLOSE_MODAL:
      return {
          param: null,
          isOpen: false
      };
    default:
      return state
  }
}