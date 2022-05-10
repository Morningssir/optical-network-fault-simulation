import { defineConfig } from 'umi';

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

export default defineConfig({
  define: {
    API_URL: `${BASE_URL}`,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api/v1': {
      target: 'http://127.0.0.1:8080',
      pathRewrite: { '^/api/v1': '' },
      changeOrigin: true,
    },
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/BasicLayout',
      routes: [
        {
          path: '/',
          component: '@/layouts/ProLayout',
          routes: [
            {
              path: 'workplace',
              name: '资源管理',
              icon: 'Profile',
              component: '@/pages/workplace',
            },
            {
              path: 'planning',
              name: '网络规划',
              icon: 'DeploymentUnit',
              component: './planning',
            },
            {
              path: 'fault',
              name: '故障仿真',
              icon: 'Thunderbolt',
              component: './fault',
            },
          ],
        },
      ],
    },
  ],
  fastRefresh: {},
});
