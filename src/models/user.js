// import { query as queryUsers } from '@/services/user';
import api from '@/services';

const {queryCurrent, permission} = api;

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    // *fetch(_, { call, put }) {
    //   const response = yield call(queryUsers);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    // },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent, {id: 1});
      yield put({
        type: 'updateState',
        payload: {
          menuPermission: response.data
        },
      });
    },
    // 获取菜单权限
    *getMenuPermission(_, { call, put }) {
      const response = yield call(permission);
      console.log('response: ', response);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
