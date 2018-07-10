import request from '../utils/request';

export async function queryBasicInfo(params) {
  return request('/api/FamilyInformation/Get', {
    method: 'POST',
    body: params,
  });
}

export async function saveBasicInfo(params) {
  return request('/api/FamilyInformation/UpdateBasicInfo', {
    method: 'POST',
    body: params,
  });
}

export async function saveProductionAndLife(params) {
  return request('/api/FamilyInformation/UpdateProductionAndLife', {
    method: 'POST',
    body: params,
  });
}

export async function saveMemberInfo(params) {
  return request('/api/PersonnelInformation/UpdateBasicInfo', {
    method: 'POST',
    body: params,
  });
}
