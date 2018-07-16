import { queryListForPovertyAlleviationAgency } from '../services/povertyalleviationagencyuserloginlog';

export default {
  namespace: 'povertyalleviationagencyuserloginlog',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *listforpovertyalleviationagency({ payload }, { call, put }) {
      const response = yield call(queryListForPovertyAlleviationAgency, payload);
      yield put({
        type: 'handleListForPovertyAlleviationAgency',
        payload: response,
      });
    },
  },

  reducers: {
    handleListForPovertyAlleviationAgency(state, action) {
      let d = action.payload;

      if (d === undefined) {
        d = {
          list: [],
        };
      }

      const { status } = d;

      if (status === 200) {
        for (const o of d.list) {
          o.key = o.povertyAlleviationAgencyUserLoginLogId;
        }

        d.pagination = {
          total: d.total,
          pageSize: d.pageSize,
          current: parseInt(d.pageNo, 10) || 1,
        };
      } else {
        d.pagination = {
          total: 0,
          pageSize: 10,
          current: 1,
        };
      }
      return {
        ...state,
        data: d,
      };
    },
  },
};
