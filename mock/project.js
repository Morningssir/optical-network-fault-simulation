import mockjs from 'mockjs';

export default {
  'GET /api/projects': (req, res) => {
    res.json({
      respCode: 200,
      ...mockjs.mock({
        'data|12': [
          {
            id: /\d{10}/,
            name: '@FIRST @LAST',
            path: '@city',
            createName: '@FIRST',
            createTime: '@date',
          },
        ],
      }),
    });
  },
  'POST /api/projects': (req, res) => {
    res.json({
      respCode: 200,
      ...mockjs.mock({
        'data|12': [
          {
            id: /\d{10}/,
            name: '@FIRST @LAST',
            path: '@city',
            createName: '@FIRST',
            createTime: '@date',
          },
        ],
      }),
    });
  },
  'DELETE /api/projects/:id': (req, res) => {
    res.json({
      respCode: 200,
      ...mockjs.mock({
        'data|12': [
          {
            id: /\d{10}/,
            name: '@FIRST @LAST',
            path: '@city',
            createName: '@FIRST',
            createTime: '@date',
          },
        ],
      }),
    });
  },
  'GET /api/projects/:id/download': (req, res) => {
    res.json({ respCode: 200 });
  },
  'POST /api/projects/upload': (req, res) => {
    res.json({ respCode: 200 });
  },
};
