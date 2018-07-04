import request from '../utils/request';

export async function queryBasicList(params) {
  return request('/api/PersonnelInformation/List', {
    method: 'POST',
    body: params,
  });
}
