import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Form, Spin, BackTop } from 'antd';
// import LzEditor from 'react-lz-editor'

@connect(({ errorlog, loading }) => ({
  errorlog,
  loading: loading.models.errorlog,
}))
@Form.create()
export default class BasicInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      metaData: {},
    };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;
    const { errorLogId } = params;
    dispatch({
      type: 'errorlog/fetch',
      payload: { errorLogId },
    }).then(() => {
      const {
        errorlog: { data },
      } = this.props;
      this.setState({ metaData: data });
    });
  }

  render() {
    const { loading } = this.props;
    const { metaData } = this.state;
    return (
      <Fragment>
        <Card title="详情信息" style={{ marginBottom: 24 }} bordered={false}>
          <Spin spinning={loading} />
          {metaData.name}
        </Card>
        <BackTop />
      </Fragment>
    );
  }
}
