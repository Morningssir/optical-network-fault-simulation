import mockjs from 'mockjs';

export default {
  'GET /api/projects/:projectId/services': (req, res) => {
    res.json({
      respCode: 200,
      ...mockjs.mock({
        'data|12': [
          {
            id: /\d{10}/,
            name: '@city - @city',
            'source|0-11': 1,
            sourceName: '@city',
            'target|0-11': 1,
            targetName: '@city',
            year: mockjs.Random.date('yyyy'),
            bandwidth: '100G',
            type: '数据',
            layer: 'WDM',
            protect: '1+1',
            'protectLimit|0-10': 1,
            nodeMust: [],
          },
        ],
      }),
    });
  },
  'POST /api/projects/:projectId/services': (req, res) => {
    res.json({ respCode: 200, message: '创建成功' });
  },
  'PUT /api/projects/:projectId/services/:serviceId': (req, res) => {
    res.json({ respCode: 200 });
  },
  'DELETE /api/projects/:projectId/services/:serviceId': (req, res) => {
    res.json({ respCode: 200, message: '删除成功' });
  },
};
