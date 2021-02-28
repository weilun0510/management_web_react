import axios from 'axios';
import { cloneDeep, isEmpty } from 'lodash';
import pathToRegexp from 'path-to-regexp';
// import { message } from 'antd';
import qs from 'qs';
import { router } from 'umi';

window.cancelRequest = new Map();
/* eslint-disable */
const NOT_LOGIN_ERROR = '401'; // 未登录

// export interface RequestConfig extends AxiosRequestConfig {
//   // 是否接口成功后自动显示Message
//   autoMessage?: boolean;
// }

/**
 * axios的请求封装，地址判断、错误处理
 *
 * @export
 * @param {object} options 请求选项
 * @returns {Promise} 请求结果
 */
export default function request(options) {
  const { data, url, method = 'get' } = options;
  const newOptions = options;
  if (!url) {
    throw new Error('request url none');
  }

  const cloneData = cloneDeep(data);
  const newUrl = matchRestfulUrl(url, cloneData);

  newOptions.url =
    method.toLocaleLowerCase() === 'get'
      ? `${newUrl}${isEmpty(cloneData) ? '' : '?'}${qs.stringify(cloneData)}`
      : newUrl;

  // session
  newOptions.withCredentials = true;
  newOptions.headers = {
    'X-Request-Type': 'ajax',
    'Content-Type': 'application/json;charset=UTF-8',
  };

  return axios(newOptions)
    .then(response => {
      // if (newOptions.responseType === 'blob') {
      //   return Promise.resolve({
      //     success: true,
      //     data: response.data,
      //   });
      // }


      const { success, code, msg, data } = response.data;
      if (!success) {
        if (code === NOT_LOGIN_ERROR) {
          router.push('/login');
        }
        throw new Error(msg);
      } else {
        return Promise.resolve({
          success,
          message: msg,
          statusCode: code,
          data: data || {},
        });
      }
    })
    .catch(error => {
      console.log('error: ', error);
      const {  message } = error;

      return {
        success: false,
        statusCode: '600',
        message,
      };
    });
}

/**
 * 正则匹配restful风格请求并替换对应参数，返回新的url
 * eg: /:id/get, data参数保证必须有id属性
 *
 * @param {string} url 请求地址
 * @param {object} data 请求数据
 * @returns {string} 新的地址
 */
function matchRestfulUrl(url, data) {
  let newUrl = url;

  try {
    let domain = '';
    const urlMatch = newUrl.match(/[a-zA-z]+:\/\/[^/]*/);
    if (urlMatch) {
      [domain] = urlMatch;
      newUrl = newUrl.slice(domain.length);
    }

    const match = pathToRegexp.parse(newUrl);
    newUrl = pathToRegexp.compile(newUrl)(data);

    for (const item of match) {
      if (item instanceof Object && item.name in data) {
        delete data[item.name];
      }
    }
    newUrl = domain + newUrl;
  } catch (e) {
    newUrl = url;
  }

  return newUrl;
}

/**
 * 匹配CRUD类型的请求，做全局提示
 *
 * @param {string} url 请求地址
 * @param {*} data 请求回复数据
 */
// function messageWithCRUDUrl(url, data) {
//   if (!url || url.length <= 0 || !data) {
//     return;
//   }

//   // 后端批量操作的错误信息会存放在data里
//   if (data.error > 0) {
//     return;
//   }

//   // 后端批量操作中有错误的直接提示错误信息

//   const array = url.split('/');
//   const action = array[array.length - 1];
//   const messages = [
//     {
//       key: 'add',
//       value: SUCCESS_ADD,
//     },
//     {
//       key: 'update',
//       value: SUCCESS_UPDATE,
//     },
//     {
//       key: 'delete',
//       value: SUCCESS_DELETE,
//     },
//   ];

//   for (let i = 0; i < messages.length; i++) {
//     const { key, value } = messages[i];
//     if (action === key)
//       Message.success(value);
//       break;
//     }
//   }
// }
