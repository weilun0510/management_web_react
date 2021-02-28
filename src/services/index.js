import request from '@/utils/request2';
import Config from '@/utils/config';
import api from './api';

const { apiPrefix } = Config;
// const  apiPrefix = '';

const gen = (params = '') => {
  let url = apiPrefix + params;
  let method = 'GET';

  const paramsArray = params.split(' ');
  if (paramsArray.length === 2) {
    [method] = paramsArray;
    url = apiPrefix + paramsArray[1];
  }

  return function (data) {
    return request({
      url,
      data,
      method,
    });
  };
};

const APIFunction = {};
// for (const key of Object.keys(api)) {
//   APIFunction[key] = gen(api[key]);
// }
Object.keys(api).forEach(key => {
  APIFunction[key] = gen(api[key]);
});
export default APIFunction;
