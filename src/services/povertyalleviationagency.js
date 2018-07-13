import request from '../utils/request';

export async function queryList(params) {
  return request('/api/PovertyAlleviationAgency/List', {
    method: 'POST',
    body: params,
  });
}
