import api from '../src/services/api';
import { Mock, ResponseWarpper } from './_utils';

const {
  queryCurrent,
  getUser,
  permission
} = api;

const usersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
    },
  ],
});

export default {
  [getUser](req, res) {

    const data = {
      content: [
        {
          id: 1,
          userName: 'string1',
          name: 'string1',
          email: 'string',
          phone: 'string',
          roleId: 0,
          roleName: 'string',
          menuList: [
            {
              id: 0,
              name: 'string',
              route: 'string',
              parentId: 0,
              icon: 'string',
              level: 0,
              children: [
                {
                  id: 0,
                  name: 'string',
                  route: 'string',
                  parentId: 0,
                  icon: 'string',
                  level: 0,
                  children: [
                    {
                      id: 0,
                      name: 'string',
                      route: 'string',
                      parentId: 0,
                      icon: 'string',
                      level: 0,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 2,
          userName: 'string1',
          name: 'string1',
          email: 'string',
          phone: 'string',
          roleId: 0,
          roleName: 'string',
          menuList: [],
        },
      ],
      pageable: {
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        offset: 0,
        pageNumber: 0,
        pageSize: 10,
        paged: true,
        unpaged: false,
      },
      last: true,
      totalPages: 1,
      totalElements: 2,
      size: 10,
      number: 0,
      sort: {
        sorted: true,
        unsorted: false,
        empty: false,
      },
      numberOfElements: 11,
      first: true,
      empty: false,
    };
    if (data) {
      res.json(ResponseWarpper.success(data));
    } else {
      res.json(ResponseWarpper.failed('Not Found'));
    }
  },
  // 支持值为 Object 和 Array
  [queryCurrent]: (req, res) => {
    const data = {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      tags: [
        {
          key: '0',
          label: '很有想法的',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
        {
          key: '3',
          label: '大长腿',
        },
        {
          key: '4',
          label: '川妹子',
        },
        {
          key: '5',
          label: '海纳百川',
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      geographic: {
        province: {
          label: '浙江省',
          key: '330000',
        },
        city: {
          label: '杭州市',
          key: '330100',
        },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    };
    res.json(ResponseWarpper.success(data));

  },
  // 权限
  [permission]: (req, res) => {
    const data = [1, 2, 3, 6, 7, 8];
    res.json(ResponseWarpper.success(data));
  },
};
