export default [
  { path: '/login', name: '登录', component: './Admin/Login', layout: false },
  { path: '/register', name: "注册", component: './Admin/Register', layout: false },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/adminer', name: "管理员", icon: 'idcard', access: 'canAdmin', component: './Admin/Adminer' },
  {
    path: '/draw',
    name: "抽奖",
    icon: 'shop',
    access: 'canAdmin',
    routes: [
      { icon: 'user', name: "用户", path: 'user', component: './Draw/User' },
      { icon: 'project', name: "项目", path: 'project', component: './Draw/Project' },
      { icon: 'flag', name: "活动", path: 'activity', component: './Draw/Activity' },
      { icon: 'gift', name: "奖品", path: 'prize', component: './Draw/Prize' },
      { icon: 'container', name: "奖单", path: 'lucky', component: './Draw/Lucky' },
    ],
  },
  { path: '/', layout: false, redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
