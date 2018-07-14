import { queryList, queryInfo } from '../services/errorlog';

export default {
  namespace: 'errorlog',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryInfo, payload);
      yield put({
        type: 'handleitem',
        payload: response,
      });
    },
    *list({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'handlelist',
        payload: response,
      });
    },
  },

  reducers: {
    handlelist(state, action) {
      let d = action.payload;

      if (d === undefined) {
        d = {
          list: [],
        };
      }

      const { status } = d;

      if (status === 200) {
        for (const o of d.list) {
          o.key = o.errorLogId;
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
    handleitem(state, action) {
      let d = action.payload;

      if (d === undefined) {
        d = {
          errorLog: {},
        };
      }
      return {
        ...state,
        data: d.data.errorLog,
      };
    },
  },
};
