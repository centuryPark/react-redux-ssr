import Loadable from 'react-loadable';
import Loading from '../component/PagesLoading';
import mainLoadData from '../pages/main/serverLoadData';
import liveLoadDate from '../pages/Live/serverLoadData';

const MainComponent = Loadable({
  loader: () => import('../pages/main'),
  loading: Loading,
});

const ListComponent = Loadable({
  loader: () => import('../pages/Live'),
  loading: Loading,
});

export default [
  {
    path: '/main',
    component: MainComponent,
    exact: true,
    loadData: mainLoadData,
    key: 'Main',
  },
  {
    path: '/list',
    component: ListComponent,
    loadData: liveLoadDate,
    exact: true,
    key: 'list',
  },
];
