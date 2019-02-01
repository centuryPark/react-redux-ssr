import {getMainInfo} from '../../redux/actions/main';

export default (store) => {
  return store.dispatch(getMainInfo())
}
