import { message } from 'antd';
import {
  queryBasicInfo,
  saveBasicInfo,
  saveProductionAndLife,
  saveMemberInfo,
} from '../services/familyinformation';

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
    *savebasicinfo({ payload }, { call }) {
      yield call(saveBasicInfo, payload);
      // const response = yield call(querySaveBasicInfo, payload);
      // yield put({
      //   type: 'savebasicinfosuccess',
      //   payload: response,
      // });
      message.success('提交成功');
    },
    *saveproductionandlife({ payload }, { call }) {
      yield call(saveProductionAndLife, payload);
      // const response = yield call(queryProductionAndLife, payload);
      // yield put({
      //   type: 'saveproductionandlifesuccess',
      //   payload: response,
      // });
      message.success('提交成功');
    },
    *savememberinfo({ payload }, { call }) {
      yield call(saveMemberInfo, payload);
      // const response = yield call(queryProductionAndLife, payload);
      // yield put({
      //   type: 'saveproductionandlifesuccess',
      //   payload: response,
      // });
      message.success('提交成功');
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
