const routes = [
  {
    name: 'login',
    path: '/login',
    component: './Login',
  },
  {
    path: '/',
    component: '../layouts',
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        name: '首页',
        icon: 'smile',
        component: './Dashboard/Home',
        id: 1,
      },
      // {
      //   path: '/admin',
      //   name: 'admin',
      //   icon: 'crown',
      //   component: './Admin',
      //   authority: ['admin'],
      //   routes: [
      //     {
      //       path: '/admin/sub-page',
      //       name: 'sub-page',
      //       icon: 'smile',
      //       component: './Dashboard/Home',
      //       authority: ['admin'],
      //     },
      //   ],
      // },
      // 商城
      {
        path: '/dashboard/mall',
        name: '商城',
        icon: 'smile',
        id: 2,
        routes: [
          // 商城装修
          {
            path: '/dashboard/mall/mallSecorate',
            component: './Dashboard/Mall/MallSecorate',
            name: '商城装修',
            icon: 'smile',
            id: 3,
          },
        ],
      },
      // 系统管理
      {
        path: '/dashboard/systemMgmt',
        name: '系统管理',
        icon: 'smile',
        id: 4,
        routes: [
          {
            path: '/dashboard/systemMgmt/user',
            component: './Dashboard/SystemMgmt/User',
            name: '用户',
            icon: 'smile',
            id: 5,
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]
export default routes;
