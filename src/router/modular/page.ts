const Router: Route[] = [
  {
    path: '/home',
    name: '首页',
    component: () => import('@/views/pages/index/index')
  },
  {
    path: '/about',
    name: '关于',
    instance: true,
    component: () => import('@/views/pages/about/index')
  },
  {
    path: '/',
    name: '音乐',
    instance: true,
    component: () => import('@/views/pages/music/index')
  }
];

export default Router;
