const Model = {
  namespace: 'planning',

  state: {
    itemSelection: {
      selectedNodeKeys: [],
      selectedLinkKeys: [],
      selectedServiceKeys: [],
    },
  },

  effects: {},

  reducers: {
    saveItemSelection(state, { payload }) {
      const { selectedNodeKeys, selectedLinkKeys, selectedServiceKeys } =
        payload || {};
      return {
        ...state,
        itemSelection: {
          selectedNodeKeys:
            selectedNodeKeys || state.itemSelection.selectedNodeKeys,
          selectedLinkKeys:
            selectedLinkKeys || state.itemSelection.selectedLinkKeys,
          selectedServiceKeys:
            selectedServiceKeys || state.itemSelection.selectedServiceKeys,
        },
      };
    },
    clearItemSelection(state) {
      return {
        ...state,
        itemSelection: {
          selectedNodeKeys: [],
          selectedLinkKeys: [],
          selectedServiceKeys: [],
        },
      };
    },
  },
};

export default Model;
