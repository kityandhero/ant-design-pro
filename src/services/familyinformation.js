import request from '../utils/request';

export async function queryBasicInfo(params) {
  return request('/api/FamilyInformation/Get', {
    method: 'POST',
    body: params,
  });
}

export async function querySaveBasicInfo(params) {
  return request('/api/FamilyInformation/UpdateBasicInfo', {
    method: 'POST',
    body: params,
  });
}

export async function queryProductionAndLife(params) {
  return request('/api/FamilyInformation/UpdateProductionAndLife', {
    method: 'POST',
    body: params,
  });
}
