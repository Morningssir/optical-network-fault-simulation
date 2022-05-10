import { queryProjects, addProject, deleteProject } from '@/services/project';

const Model = {
  namespace: 'project',

  state: {
    proList: [],
    currentPro: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      try {
        const response = yield call(queryProjects);

        yield put({
          type: 'saveProList',
          payload: response,
        });
      } catch (error) {
        console.error(error);
      }
    },
    *submit({ payload }, { call, put }) {
      let callback;

      if (payload.projectId) {
        callback = deleteProject;
      } else {
        callback = addProject;
      }

      try {
        const response = yield call(callback, payload);

        yield put({
          type: 'saveProList',
          payload: response,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },

  reducers: {
    saveProList(state, { payload }) {
      return {
        ...state,
        proList: payload || [],
      };
    },
    saveCurrentPro(state, { payload }) {
      return {
        ...state,
        currentPro: {
          ...state.currentPro,
          ...payload,
        },
      };
    },
    resetCurrentPro(state) {
      return {
        ...state,
        currentPro: {},
      };
    },
  },
};

export default Model;
