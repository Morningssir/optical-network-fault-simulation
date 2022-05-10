import mockjs from 'mockjs';

export default {
  'POST /api/projects/:projectId/plan': (req, res) => {
    res.json({
      respCode: 200,
      message: '规划成功',
    });
  },
  'GET /api/v1/projects/:projectId/services/:serviceId/plan': (req, res) => {
    res.json({
      respCode: 200,
      ...mockjs.mock({
        data: {
          workRoute: {
            nodeList: [
              {
                id: '13',
                name: 'N',
              },
              {
                id: '14',
                name: 'O',
              },
              {
                id: '17',
                name: 'R',
              },
              {
                id: '15',
                name: 'P',
              },
              {
                id: '16',
                name: 'Q',
              },
            ],
            linkList: [
              {
                id: '17',
                name: 'N - O',
                sourceNode: {
                  id: '13',
                  name: 'N',
                },
                targetNode: {
                  id: '14',
                  name: 'O',
                },
              },
              {
                id: '15',
                name: 'O - R',
                sourceNode: {
                  id: '14',
                  name: 'O',
                },
                targetNode: {
                  id: '17',
                  name: 'R',
                },
              },
              {
                id: '4',
                name: 'P - R',
                sourceNode: {
                  id: '15',
                  name: 'P',
                },
                targetNode: {
                  id: '17',
                  name: 'R',
                },
              },
              {
                id: '5',
                name: 'P - Q',
                sourceNode: {
                  id: '15',
                  name: 'P',
                },
                targetNode: {
                  id: '16',
                  name: 'Q',
                },
              },
            ],
          },
          protectRoute: {
            'nodeList|4': [
              {
                id: /\d{10}/,
                name: '@city',
                'longitude|1-100.1-2': 0.0,
                'latitude|1-100.1-2': 0.0,
              },
            ],
            'linkList|3': [
              {
                id: /\d{10}/,
                name: '@city - @city',
                sourceNode: {
                  id: /\d{10}/,
                  name: '@city',
                  'longitude|1-100.1-2': 0.0,
                  'latitude|1-100.1-2': 0.0,
                },
                targetNode: {
                  id: /\d{10}/,
                  name: '@city',
                  'longitude|1-100.1-2': 0.0,
                  'latitude|1-100.1-2': 0.0,
                },
              },
            ],
          },
        },
      }),
    });
  },
  'GET /api/projects/:projectId/links/:linkType/:linkId/plan': (req, res) => {
    res.json({
      respCode: 200,
      ...mockjs.mock({
        'data|5': [
          {
            id: /\d{10}/,
            name: '@city - @city',
            sourceNode: {
              id: /\d{10}/,
              name: '@city',
              'longitude|1-100.1-2': 0.0,
              'latitude|1-100.1-2': 0.0,
            },
            targetNode: {
              id: /\d{10}/,
              name: '@city',
              'longitude|1-100.1-2': 0.0,
              'latitude|1-100.1-2': 0.0,
            },
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
};
