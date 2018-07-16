import {
  queryListForPovertyAlleviationAgency,
  queryList,
} from '../services/povertyalleviationagencyuser';

export default {
  namespace: 'povertyalleviationagencyuser',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'handleList',
        payload: response,
      });
    },
    *listforpovertyalleviationagency({ payload }, { call, put }) {
      const response = yield call(queryListForPovertyAlleviationAgency, payload);
      yield put({
        type: 'handleListForPovertyAlleviationAgency',
        payload: response,
      });
    },
  },

  reducers: {
    handleList(state, action) {
      let d = action.payload;

      if (d === undefined) {
        d = {
          list: [],
        };
      }

      const { status } = d;

      if (status === 200) {
        for (const o of d.list) {
          o.key = o.povertyAlleviationAgencyUserId;
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
          o.key = o.povertyAlleviationAgencyUserId;
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
