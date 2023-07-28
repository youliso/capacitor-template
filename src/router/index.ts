import { Router } from '@youliso/granule';

const router = new Router('hash', {
  '/': {
    component: () => import('@/views/app'),
    children: {
      home: {
        component: () => import('@/views/pages/home')
      }
    }
  }
});

export default router;
