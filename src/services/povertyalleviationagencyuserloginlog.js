import request from '../utils/request';

export async function queryListForPovertyAlleviationAgency(params) {
  return request(
    '/api/PovertyAlleviationAgencyUserLoginLog/listforcurrentpovertyalleviationagency',
    {
      method: 'POST',
      body: params,
    }
  );
}
