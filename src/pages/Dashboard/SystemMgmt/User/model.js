import api from '@/services/index';

const { getUser } = api;


const UserModel = {
  namespace: 'user2',

  state: {
    userData: {},
  },

  effects: {
    *getUser({ payload }, { call, put }) {
      const res = yield call(getUser, payload);
      if (res.statusCode === '200') {
        yield put({
          type: 'updateState',
          payload: {
            userData: res.data,
          },
        });
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  subscriptions: {},
};

export default UserModel;
