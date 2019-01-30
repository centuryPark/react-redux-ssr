import { GET_MAIN_INFO } from '../actions/main'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_MAIN_INFO:
      return action.data;
    default: return state;
  }
}
