import Main from '../pages/main';
import List from '../pages/Live';

export default [
    {
        path: '/main',
        component: Main,
        exact: true,
        loadData: Main.loadData,
        key: 'Main'
    },
    {
        path: '/list',
        component: List,
        loadData: List.loadData,
        exact: true,
        key: 'list'
    }
]