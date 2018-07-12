import request from '../utils/request';

export async function queryListData(params) {
  return request('/api/IncomeExpenditurePrice/List', {
    method: 'POST',
    body: params,
  });
}
