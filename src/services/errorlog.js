import request from '../utils/request';

export async function queryInfo(params) {
  return request('/api/ErrorLog/Get', {
    method: 'POST',
    body: params,
  });
}

export async function queryList(params) {
  return request('/api/ErrorLog/List', {
    method: 'POST',
    body: params,
  });
}
