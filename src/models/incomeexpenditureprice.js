import { message } from 'antd';
import { queryListData, addData, updateData } from '../services/incomeexpenditureprice';

export default {
  namespace: 'incomeexpenditureprice',

  state: {
    incomeexpenditureprice: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryListData, payload);
      yield put({
        type: 'handlelistdata',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addData, payload);
      yield put({
        type: 'handleadd',
        payload: response,
      });
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateData, payload);
      yield put({
        type: 'handleupdate',
        payload: response,
      });
    },
  },

  reducers: {
    handlelistdata(state, action) {
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
    handleadd(state, action) {
      const d = action.payload;

      if (d === undefined) {
        message.error('接口错误');
      } else {
        const { status } = d;
        const errorMessage = d.message;

        if (status === 200) {
          message.success('操作成功');
        } else {
          message.error(errorMessage);
        }
      }
      return {
        ...state,
        data: d,
      };
    },
  },
};
