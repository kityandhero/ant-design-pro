import { queryBasicInfo } from '../services/familyinformation';

export default {
  namespace: 'familyinformation',

  state: {
    data: {
      familyInformation: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryBasicInfo, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      let d = action.payload;

      if (d === undefined) {
        d = {
          familyInformation: {},
        };
      }
      return {
        ...state,
        data: d.data.familyInformation,
      };
    },
  },
};
