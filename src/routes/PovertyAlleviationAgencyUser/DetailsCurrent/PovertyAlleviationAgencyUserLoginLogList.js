import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Form, BackTop } from 'antd';
import TimeLineCustom from 'components/TimeLineCustom';

@connect(({ povertyalleviationagencyuserloginlog, loading }) => ({
  povertyalleviationagencyuserloginlog,
  loading: loading.models.povertyalleviationagencyuserloginlog,
}))
@Form.create()
export default class PovertyAlleviationAgencyUserLoginLogList extends PureComponent {
  state = {
    customData: {
      count: 0,
      list: [],
      pagination: {},
    },
    pageNo: 1,
    pageSize: 6,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { pageNo, pageSize } = this.state;

    dispatch({
      type: 'povertyalleviationagencyuserloginlog/listforcurrentoperator',
      payload: { pageNo, pageSize },
    }).then(() => {
      const {
        povertyalleviationagencyuserloginlog: { data },
      } = this.props;
      this.setState({ customData: data });
    });
  }

  handleStandardTableChange = (pageNo, pageSize) => {
    const { dispatch } = this.props;

    const params = {
      pageNo,
      pageSize,
    };

    dispatch({
      type: 'povertyalleviationagencyuserloginlog/listforcurrentoperator',
      payload: params,
    }).then(() => {
      const {
        povertyalleviationagencyuserloginlog: { data },
      } = this.props;

      this.setState({ customData: data });
      this.setState({ pageNo });
      this.setState({ pageSize });
    });
  };

  render() {
    const { loading } = this.props;
    const { customData } = this.state;

    return (
      <Fragment>
        <Card style={{ marginBottom: 24 }} bordered={false}>
          <TimeLineCustom
            loading={loading}
            data={customData}
            onChange={this.handleStandardTableChange}
            getDateLabel={item => item.createTime}
            getBackgroundColorKey={item => item.povertyAlleviationAgencyUserLoginLogId}
            getTime={item => item.createTime}
            getTitle={item => {
              return (
                <div>
                  <a href="#">{item.name}</a> ({item.loginName})
                </div>
              );
            }}
            getDescription={item => item.remark}
            getBottomLeft={item => `所属组织：${item.povertyAlleviationAgencyName}`}
            getBottomRight={item => `操作IP:${item.ip}`}
          />
        </Card>
        <BackTop />
      </Fragment>
    );
  }
}
