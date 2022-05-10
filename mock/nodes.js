import mockjs from 'mockjs';

export default {
  'GET /api/projects/:projectId/nodes': (req, res) => {
    res.json({
      respCode: 200,
      ...mockjs.mock({
        'data|12': [
          {
            'id|+1': 0,
            name: '@city',
            code: /[N]\d{3}/,
            'longitude|1-100.1-2': 0.0,
            'latitude|1-100.1-2': 0.0,
            year: mockjs.Random.date('yyyy'),
            completedYear: mockjs.Random.date('yyyy'),
            'serviceLength|0-10': 1,
            'targetCapacity|0-100': 1,
            'capacity|0-100': 1,
            'spareNum|0-100': 1,
            'currentNum|0-100': 1,
            manager: '@FIRST',
            phone: /^[1][3456789][0-9]{9}$/,
          },
        ],
      }),
    });
  },
  'POST /api/projects/:projectId/nodes': (req, res) => {
    res.json({ respCode: 200, message: '创建成功' });
  },
  'PUT /api/projects/:projectId/nodes/:nodeId': (req, res) => {
    res.json({ respCode: 200 });
  },
  'DELETE /api/projects/:projectId/nodes/:nodeId': (req, res) => {
    res.json({ respCode: 200, message: '删除成功' });
  },
};
