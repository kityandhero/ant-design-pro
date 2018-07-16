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
