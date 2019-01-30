import { GET_LIVE_LIST } from '../actions/live'

export default (state = [], action) => {
  switch (action.type) {
    case GET_LIVE_LIST:
      return action.data;
    default: return state;
  }
}
