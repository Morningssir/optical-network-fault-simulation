import mockjs from 'mockjs';

export default {
  'GET /api/projects/:projectId/links': (req, res) => {
    res.json({
      respCode: 200,
      ...mockjs.mock({
        'data|12': [
          {
            id: /\d{10}/,
            name: '@city - @city',
            code: /[F]\d{3}/,
            'source|0-11': 1,
            sourceName: '@city',
            'target|0-11': 1,
            targetName: '@city',
            year: mockjs.Random.date('yyyy'),
            'serviceLength|0-10': 1,
            'length|0-100.0-2': 1.0,
            'xxsl|0-100': 1,
            asfs: '空缆',
            'faultTime|0-365': 1,
            'aveAttenua|0-100.0-2': 0.0,
            'xxsh|0-100.0-2': 0.0,
          },
        ],
      }),
    });
  },
  'POST /api/projects/:projectId/links': (req, res) => {
    res.json({ respCode: 200, message: '创建成功' });
  },
  'PUT /api/projects/:projectId/links/:linkId': (req, res) => {
    res.json({ respCode: 200 });
  },
  'DELETE /api/projects/:projectId/links/:linkId': (req, res) => {
    res.json({ respCode: 200, message: '删除成功' });
  },
};
