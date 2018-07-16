import request from '../utils/request';

export async function queryList(params) {
  return request('/api/ExcelImportHistory/List', {
    method: 'POST',
    body: params,
  });
}
