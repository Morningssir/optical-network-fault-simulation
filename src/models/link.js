import { queryLinks, addLink, deleteLink, modifyLink } from '@/services/link';

const Model = {
  namespace: 'link',

  state: {
    linkList: [],
  },

  effects: {
    *fetch(_, { call, put, select }) {
      try {
        const projectId = yield select((state) => state.project.currentPro.id);
        const response = yield call(queryLinks, { projectId });
        yield put({
          type: 'saveLinkList',
          payload: response,
        });
      } catch (error) {
        console.error(error);
      }
    },
    *submit({ payload }, { call, put, select }) {
      let callback;

      if (payload.linkId) {
        callback = Object.keys(payload).length > 1 ? modifyLink : deleteLink;
      } else {
        callback = addLink;
      }

      try {
        const projectId = yield select((state) => state.project.currentPro.id);
        const response = yield call(callback, { projectId, ...payload });

        yield put({
          type: 'saveLinkList',
          payload: response,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },

  reducers: {
    saveLinkList(state, { payload }) {
      return {
        ...state,
        linkList: payload || [],
      };
    },
  },
};

export default Model;
