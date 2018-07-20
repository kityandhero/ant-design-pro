import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, BackTop } from 'antd';
import TimeLineCustom from 'components/TimeLineCustom';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getCurrentUrlInfo } from '../../utils/tools';

@connect(({ povertyalleviationagencyuserloginlog, loading }) => ({
  povertyalleviationagencyuserloginlog,
  loading: loading.models.povertyalleviationagencyuserloginlog,
}))
@Form.create()
export default class List extends PureComponent {
  state = {
    pageTitle: '',
    customData: {
      count: 0,
      list: [],
      pagination: {},
    },
    pageNo: 1,
    pageSize: 6,
  };

  componentDidMount() {
    const { dispatch, location, routerData } = this.props;
    const { pathname } = location;
    const currentUrl = getCurrentUrlInfo(routerData, pathname);
    const { name } = currentUrl;
    this.setState({ pageTitle: name });
    const { pageNo, pageSize } = this.state;

    dispatch({
      type: 'povertyalleviationagencyuserloginlog/list',
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
      type: 'povertyalleviationagencyuserloginlog/list',
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
    const { customData, pageTitle } = this.state;

    return (
      <PageHeaderLayout title={`${pageTitle}列表`}>
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
      </PageHeaderLayout>
    );
  }
}
