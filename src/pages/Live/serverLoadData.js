import {getLiveList} from '../../redux/actions/live';

export default (store) => {
  return store.dispatch(getLiveList())
}
