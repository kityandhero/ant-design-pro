import request from '../utils/request';

export async function queryStatisticExist(params) {
  return request('/api/IncomeExpenditureYearStatistic/GetStatisticExist', {
    method: 'POST',
    body: params,
  });
}

export async function queryYearStatistic(params) {
  return request('/api/IncomeExpenditureYearStatistic/Get', {
    method: 'POST',
    body: params,
  });
}
