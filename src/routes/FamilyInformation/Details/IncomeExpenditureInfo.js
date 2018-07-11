import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Form, Spin } from 'antd';
import { IncomeExpenditureYearStatisticInfo } from './IncomeExpenditureYearStatisticInfo';
import { IncomeExpenditureQuarterStatisticInfo } from './IncomeExpenditureQuarterStatisticInfo';
import { getPageQuery } from '../../../utils/utils';

@connect(({ incomeexpenditure, loading }) => ({
  incomeexpenditure,
  loading: loading.models.incomeexpenditure,
}))
@Form.create()
export default class IncomeExpenditureInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      familyId: 0,
      dataLoading: true,
      statisticExist: [],
    };
  }

  componentDidMount() {
    const queryData = getPageQuery();
    const familyId = queryData.familyId || 0;
    this.setState({ familyId });
    const { dispatch } = this.props;
    dispatch({
      type: 'incomeexpenditure/getstatisticexist',
      payload: { familyId },
    }).then(() => {
      this.setState({ dataLoading: false });
      const {
        incomeexpenditure: { data },
      } = this.props;
      this.setState({ statisticExist: data });
    });
  }

  render() {
    const { familyId } = this.state;
    const { dataLoading, statisticExist } = this.state;
    let list = statisticExist;
    list = list.map(item => {
      const v = item;
      v.key = `${item.year}${item.quarter}`;
      return v;
    });
    const com = [];
    list.forEach(item => {
      if (item.exist === 0) {
        com.push(
          <Card
            key={item.key}
            type="inner"
            style={{
              marginBottom: '16px',
            }}
          >
            {item.year}
          </Card>
        );
      } else {
        if (item.type === 1) {
          com.push(
            <IncomeExpenditureQuarterStatisticInfo
              key={item.key}
              familyId={familyId}
              year={item.year}
              quarter={item.quarter}
            />
          );
        }
        if (item.type === 0) {
          com.push(
            <IncomeExpenditureYearStatisticInfo
              key={item.key}
              familyId={familyId}
              year={item.year}
            />
          );
        }
      }
    });
    return (
      <Fragment>
        <Spin spinning={dataLoading}>{com}</Spin>
      </Fragment>
    );
  }
}
