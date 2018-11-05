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
import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/styles/hljs';
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
class BasicInfo extends PureComponent {
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
        <Card title="参数信息" style={{ marginBottom: 24 }} bordered={false}>
          <Spin spinning={loading}>
            <DescriptionList className={styles.headerList} size="small" col="1" layout="vertical">
              <Description
                term="Header信息"
                style={{
                  marginBottom: '16px',
                }}
              >
                <SyntaxHighlighter
                  language="javascript"
                  // style={docco}
                >
                  {JSON.stringify(metaData.headerJson || '', null, '    ')}
                </SyntaxHighlighter>
              </Description>
              <Description
                term="Url参数"
                style={{
                  marginBottom: '16px',
                }}
              >
                <SyntaxHighlighter
                  language="javascript"
                  //  style={docco}
                >
                  {JSON.stringify(metaData.urlParamsJson || '', null, '    ')}
                </SyntaxHighlighter>
              </Description>
              <Description
                term="Form参数"
                style={{
                  marginBottom: '16px',
                }}
              >
                <SyntaxHighlighter
                  language="javascript"
                  //  style={docco}
                >
                  {JSON.stringify(metaData.formParamsJson || '', null, '    ')}
                </SyntaxHighlighter>
              </Description>
            </DescriptionList>
          </Spin>
        </Card>
        <BackTop />
      </Fragment>
    );
  }
}

export default BasicInfo;
