import api from '../src/services/api';
import { ResponseWarpper } from './_utils';

const {
  login,
} = api;

export default {
  [login]: (req, res) => {
    const { password, userName, type } = req.body;
    if (password === 'ant.design' && userName === 'admin') {
      console.log({res});
      res.json(ResponseWarpper.success());
      return;
    }

    if (password === 'ant.design' && userName === 'user') {
      res.json(ResponseWarpper.success({name: '陈伟伦', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'}));
    }

  },
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
};
