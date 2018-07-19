import request from '../utils/request';

export async function queryList(params) {
  return request('/api/InformationChangeLog/List', {
    method: 'POST',
    body: params,
  });
}

export async function queryListForCurrentOperator(params) {
  return request('/api/InformationChangeLog/ListForCurrentOperator', {
    method: 'POST',
    body: params,
  });
}
