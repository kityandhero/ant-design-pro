import request from '../utils/request';

export async function queryList(params) {
  return request('/api/ErrorLog/List', {
    method: 'POST',
    body: params,
  });
}
