import request from '../utils/request';

export async function queryBasicInfo(params) {
  return request('/api/FamilyInformation/Get', {
    method: 'POST',
    body: params,
  });
}
