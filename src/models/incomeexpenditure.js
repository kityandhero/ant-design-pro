// import { message } from 'antd';
import {
  queryStatisticExist,
  queryYearStatistic,
  queryQuarterStatistic,
} from '../services/incomeexpenditure';

export default {
  namespace: 'incomeexpenditure',

  state: {
    statisticExist: [],
  },

  effects: {
    // *fetch({ payload }, { call, put }) {
    //   const response = yield call(queryStatisticExist, payload);
    //   yield put({
    //     type: 'getstatisticexist',
    //     payload: response,
    //   });
    // },
    *getstatisticexist({ payload }, { call, put }) {
      const response = yield call(queryStatisticExist, payload);
      yield put({
        type: 'handlestatisticexist',
        payload: response,
      });
    },
    *getyearstatistic({ payload }, { call, put }) {
      const response = yield call(queryYearStatistic, payload);
      yield put({
        type: 'handleyearstatistic',
        payload: response,
      });
    },
    *getquarterstatistic({ payload }, { call, put }) {
      const response = yield call(queryQuarterStatistic, payload);
      yield put({
        type: 'handlequarterstatistic',
        payload: response,
      });
    },
  },

  reducers: {
    handlestatisticexist(state, action) {
      let d = action.payload;
      if (d === undefined) {
        d = {
          statisticExist: [],
        };
      } else {
        d.statisticExist = d.list;
      }
      // console.dir(d);
      return {
        ...state,
        data: d.statisticExist,
      };
    },
    handleyearstatistic(state, action) {
      let d = action.payload;

      if (d === undefined) {
        d = {
          incomeExpenditureYearStatistic: {},
        };
      } else {
        d.incomeExpenditureYearStatistic = d.data.incomeExpenditureYearStatistic;
      }
      return {
        ...state,
        data: d.incomeExpenditureYearStatistic,
      };
    },
    handlequarterstatistic(state, action) {
      let d = action.payload;
      if (d === undefined) {
        d = {
          incomeExpenditureQuarterStatistic: {},
        };
      } else {
        d.incomeExpenditureQuarterStatistic = d.data.incomeExpenditureQuarterStatistic;
      }
      return {
        ...state,
        data: d.incomeExpenditureQuarterStatistic,
      };
    },
  },
};
