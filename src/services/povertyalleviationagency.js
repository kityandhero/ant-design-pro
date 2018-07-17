import request from '../utils/request';

export async function queryList(params) {
  return request('/api/PovertyAlleviationAgency/List', {
    method: 'POST',
    body: params,
  });
}

export async function queryPovertyAlleviationAgency(params) {
  return request('/api/PovertyAlleviationAgency/Get', {
    method: 'POST',
    body: params,
  });
}

export async function queryCurrentPovertyAlleviationAgency(params) {
  return request('/api/PovertyAlleviationAgency/GetCurrent', {
    method: 'POST',
    body: params,
  });
}

export async function updateCurrentBasicInfo(params) {
  return request('/api/PovertyAlleviationAgency/UpdateCurrentBasicInfo', {
    method: 'POST',
    body: params,
  });
}

export async function updateCurrentContent(params) {
  return request('/api/PovertyAlleviationAgency/UpdateCurrentContent', {
    method: 'POST',
    body: params,
  });
}
