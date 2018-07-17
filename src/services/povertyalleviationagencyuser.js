import request from '../utils/request';

export async function queryList(params) {
  return request('/api/PovertyAlleviationAgencyUserLoginLog/List', {
    method: 'POST',
    body: params,
  });
}

export async function queryListForPovertyAlleviationAgency(params) {
  return request('/api/PovertyAlleviationAgencyUser/ListForCurrentPovertyAlleviationAgency', {
    method: 'POST',
    body: params,
  });
}

export async function queryPovertyAlleviationAgencyUser(params) {
  return request('/api/PovertyAlleviationAgencyUser/Get', {
    method: 'POST',
    body: params,
  });
}

export async function queryCurrentPovertyAlleviationAgencyUser(params) {
  return request('/api/PovertyAlleviationAgencyUser/GetCurrent', {
    method: 'POST',
    body: params,
  });
}

export async function updateCurrentBasicInfo(params) {
  return request('/api/PovertyAlleviationAgencyUser/UpdateCurrentBasicInfo', {
    method: 'POST',
    body: params,
  });
}

export async function updateCurrentContent(params) {
  return request('/api/PovertyAlleviationAgencyUser/UpdateCurrentContent', {
    method: 'POST',
    body: params,
  });
}
