import {
  queryServices,
  addService,
  deleteService,
  modifyService,
} from '@/services/service';

const Model = {
  namespace: 'service',

  state: {
    serviceList: [],
  },

  effects: {
    *fetch(_, { call, put, select }) {
      try {
        const projectId = yield select((state) => state.project.currentPro.id);
        const response = yield call(queryServices, { projectId });
        yield put({
          type: 'saveServiceList',
          payload: response,
        });
      } catch (error) {
        console.error(error);
      }
    },
    *submit({ payload }, { call, put, select }) {
      let callback;

      if (payload.serviceId) {
        callback =
          Object.keys(payload).length > 1 ? modifyService : deleteService;
      } else {
        callback = addService;
      }

      try {
        const projectId = yield select((state) => state.project.currentPro.id);
        const response = yield call(callback, { projectId, ...payload });

        yield put({
          type: 'saveServiceList',
          payload: response,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },

  reducers: {
    saveServiceList(state, { payload }) {
      return {
        ...state,
        serviceList: payload || [],
      };
    },
  },
};

export default Model;
