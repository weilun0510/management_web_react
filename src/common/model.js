// import { queryNotices } from '@/services/user';

const CommonModel = {
  namespace: 'common',
  state: {},
  effects: {},
  reducers: {
    updateState(state, { payload }){
      console.log({
        ...state,
        ...payload
      });
      return {
        ...state,
        ...payload
      };
    }
  },

};
export default CommonModel;
