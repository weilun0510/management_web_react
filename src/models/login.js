import { stringify } from 'querystring';
import { router } from 'umi';
// import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import api from '@/services';
import { message, Avatar } from 'antd';

const {login}  = api;

const Model = {
  namespace: 'login',
  state: {
    currentUser: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {},
    status: undefined,
  },
  effects: {
    * login({ payload }, { call, put }) {
      // const response = yield call(fakeAccountLogin, payload);
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.statusCode === '200') {
        console.log({response});
        if (response.data.name) {
          yield put({
            type: 'saveUserInfo',
            payload: response.data,
          });
          localStorage.setItem('userInfo', JSON.stringify(response.data));
        }
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        router.replace(redirect || '/');
      } else {
        message.error(response.message);
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/login' && !redirect) {
        localStorage.clear();
        router.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
    saveUserInfo(state, { payload }) {
      return { ...state, currentUser: payload };
    }
  },
};
export default Model;
