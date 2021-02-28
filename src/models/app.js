// import { queryNotices } from '@/services/user';

const AppModel = {
  namespace: 'app',
  state: {
    headerTabList: [{name: '首页装修', path: '/home'}, {name: '发现页装修', path: '/dashboard/mall/mallSecorate'}, {name: '微页面装修', path: ''}, {name: '底部导航栏', path: ''}, {name: '配色风格', path: ''}],
    collapsed: false,
    notices: [],
  },
  effects: {},
  reducers: {
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },
    // 改变layout的头部tab数据
    getTabList(state, { payload }) {
      return {
        ...state,
        headerTabList: payload
      };
    }
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default AppModel;
