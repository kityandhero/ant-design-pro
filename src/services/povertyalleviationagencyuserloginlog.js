import request from '../utils/request';

export async function queryList(params) {
  return request('/api/PovertyAlleviationAgencyUserLoginLog/List', {
    method: 'POST',
    body: params,
  });
}

export async function queryListForCurrentOperator(params) {
  return request('/api/PovertyAlleviationAgencyUserLoginLog/ListForCurrentOperator', {
    method: 'POST',
    body: params,
  });
}

export async function queryListForPovertyAlleviationAgency(params) {
  return request(
    '/api/PovertyAlleviationAgencyUserLoginLog/ListForCurrentPovertyAlleviationAgency',
    {
      method: 'POST',
      body: params,
    }
  );
}
