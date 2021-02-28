import Mock from 'mockjs';
import qs from 'qs';

export const Constant = {
  apiPrefix: '',
};

export const ResponseWarpper = {
  success(data, message = '操作成功') {
    return {
      success: true,
      msg: message,
      code: '200',
      data,
    };
  },
  failed(message = '操作失败') {
    return {
      success: false,
      msg: message,
      code: '400',
    };
  },
};

export { Mock, qs };
