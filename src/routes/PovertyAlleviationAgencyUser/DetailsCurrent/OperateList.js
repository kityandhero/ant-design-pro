import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Form, BackTop } from 'antd';
import TimeLineCustom from 'components/TimeLineCustom';

@connect(({ informationchangelog, loading }) => ({
  informationchangelog,
  loading: loading.models.informationchangelog,
}))
@Form.create()
export default class OperateList extends PureComponent {
  state = {
    customData: {
      count: 0,
      list: [],
      pagination: {},
    },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'informationchangelog/listforcurrentoperator',
      payload: {},
    }).then(() => {
      const {
        informationchangelog: { data },
      } = this.props;
      this.setState({ customData: data });
    });
  }

  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;

    const params = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    };

    dispatch({
      type: 'informationchangelog/listforcurrentoperator',
      payload: params,
    }).then(() => {
      const {
        informationchangelog: { data },
      } = this.props;
      this.setState({ customData: data });
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
          />
        </Card>
        <BackTop />
      </Fragment>
    );
  }
}
