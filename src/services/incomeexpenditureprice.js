import request from '../utils/request';

export async function queryListData(params) {
  return request('/api/IncomeExpenditurePrice/List', {
    method: 'POST',
    body: params,
  });
}

export async function addData(params) {
  return request('/api/IncomeExpenditurePrice/Add', {
    method: 'POST',
    body: params,
  });
}

export async function updateData(params) {
  return request('/api/IncomeExpenditurePrice/Update', {
    method: 'POST',
    body: params,
  });
}
