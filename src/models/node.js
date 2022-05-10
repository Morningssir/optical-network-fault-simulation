import { queryNodes, addNode, deleteNode, modifyNode } from '@/services/node';

const Model = {
  namespace: 'node',

  state: {
    nodeList: [],
  },

  effects: {
    *fetch(_, { call, put, select }) {
      try {
        const projectId = yield select((state) => state.project.currentPro.id);
        const response = yield call(queryNodes, { projectId });
        yield put({
          type: 'saveNodeList',
          payload: response,
        });
      } catch (error) {
        console.error(error);
      }
    },
    *submit({ payload }, { call, put, select }) {
      let callback;

      if (payload.nodeId) {
        callback = Object.keys(payload).length > 1 ? modifyNode : deleteNode;
      } else {
        callback = addNode;
      }

      try {
        const projectId = yield select((state) => state.project.currentPro.id);
        const response = yield call(callback, { projectId, ...payload });

        yield put({
          type: 'saveNodeList',
          payload: response,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },

  reducers: {
    saveNodeList(state, { payload }) {
      return {
        ...state,
        nodeList: payload || [],
      };
    },
  },
};

export default Model;
