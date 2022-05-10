const Model = {
  namespace: 'workplace',

  state: {},

  effects: {
    *fetch(_, { put }) {
      yield put.resolve({
        type: 'node/fetch',
      });
      yield put.resolve({
        type: 'link/fetch',
      });
      yield put.resolve({
        type: 'service/fetch',
      });
    },
  },

  reducers: {},
};

export default Model;
