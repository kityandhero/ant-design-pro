// import { message } from 'antd';
import { queryListData } from '../services/incomeexpenditureprice';

export default {
  namespace: 'incomeexpenditureprice',

  state: {
    incomeexpenditureprice: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryListData, payload);
      yield put({
        type: 'handllistdata',
        payload: response,
      });
    },
  },

  reducers: {
    handllistdata(state, action) {
      let d = action.payload;

      if (d === undefined) {
        d = {
          list: [],
        };
      }

      const { status } = d;

      if (status === 200) {
        for (const o of d.list) {
          o.key = o.incomeExpenditurePriceId;
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
