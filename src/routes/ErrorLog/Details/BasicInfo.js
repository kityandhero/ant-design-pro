import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  // Button,
  Form,
  // Row,
  // Col,
  // Input,
  // InputNumber,
  // DatePicker,
  Spin,
  BackTop,
  // Icon,
  // Divider,
  // Select,
} from 'antd';
import DescriptionList from '../../../components/DescriptionList';
import styles from './BasicInfo.less';

const { Description } = DescriptionList;
// const FormItem = Form.Item;
// const { MonthPicker } = DatePicker;

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
        <Card title="基础信息" style={{ marginBottom: 24 }} bordered={false}>
          <Spin spinning={loading}>
            <DescriptionList className={styles.headerList} size="small" col="1" layout="vertical">
              <Description
                term="Url"
                style={{
                  marginBottom: '16px',
                }}
              >
                {metaData.url || ''}
              </Description>
              <Description
                term="异常信息"
                style={{
                  marginBottom: '16px',
                }}
              >
                {metaData.message || ''}
              </Description>
              <Description
                term="请求域"
                style={{
                  marginBottom: '16px',
                }}
              >
                {metaData.host || ''}
              </Description>
              <Description
                term="发生源"
                style={{
                  marginBottom: '16px',
                }}
              >
                {metaData.source || ''}
              </Description>
              <Description
                term="创建时间"
                style={{
                  marginBottom: '16px',
                }}
              >
                {metaData.createTime || ''}
              </Description>
              <Description
                term="堆栈跟踪"
                style={{
                  marginBottom: '24px',
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: metaData.stackTrace }} />
              </Description>
            </DescriptionList>
          </Spin>
        </Card>
        <BackTop />
      </Fragment>
    );
  }
}
