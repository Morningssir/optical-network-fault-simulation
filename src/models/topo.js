import { Node } from '../protos/Node';
import { Link } from '../protos/Link';
import { Service } from '../protos/Service';

const Model = {
  namespace: 'topo',

  state: {
    nodeList: [],
    linkList: [],
    serviceList: [],
    route: {},
  },

  effects: {
    *fetch(_, { select, put }) {
      const nodeList = yield select((state) => state.node.nodeList);
      const linkList = yield select((state) => state.link.linkList);
      const serviceList = yield select((state) => state.service.serviceList);

      yield put({
        type: 'saveTopoData',
        payload: {
          nodeList,
          linkList,
          serviceList,
        },
      });
    },
  },

  reducers: {
    saveTopoData(state, { payload }) {
      const { nodeList, linkList, serviceList } = payload;
      return {
        ...state,
        nodeList: nodeList.map(Node.convertToMapFormat),
        linkList: linkList.map(Link.convertToMapFormat),
        serviceList: serviceList.map(Service.convertToMapFormat),
      };
    },
    saveTopoRoute(state, { payload }) {
      return {
        ...state,
        route: payload || {},
      };
    },
  },
};

export default Model;
