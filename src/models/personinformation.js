import { queryBasicList } from '../services/personinformation';

export default {
  namespace: 'personinformation',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryBasicList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    // *add({ payload, callback }, { call, put }) {
    //   const response = yield call(addRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    // *remove({ payload, callback }, { call, put }) {
    //   const response = yield call(removeRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
  },

  reducers: {
    save(state, action) {
      // console.dir(action);
      const d = action.payload;
      // for (const key in d.list) {
      //   if (d.list.hasOwnProperty(key)) {
      //     const o = d.list[key];
      //     o.key = o.personnelId;
      //   }
      // }
      for (const o of d.list) {
        o.key = o.personnelId;
      }
      d.pagination = {
        total: d.total,
        pageSize: d.pageSize,
        current: parseInt(d.pageNo, 10) || 1,
      };
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
