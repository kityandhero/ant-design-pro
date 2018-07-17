import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Form, Row, Col, Spin, BackTop, Upload, Icon, message } from 'antd';

const { Dragger } = Upload;

@connect(({ povertyalleviationagencyuser, loading }) => ({
  povertyalleviationagencyuser,
  loading: loading.models.povertyalleviationagencyuser,
}))
@Form.create()
export default class BasicInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      metaData: {},
      saving: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'povertyalleviationagencyuser/getcurrent',
      payload: {},
    }).then(() => {
      const {
        povertyalleviationagencyuser: { data },
      } = this.props;
      this.setState({ metaData: data });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { metaData } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ saving: true });
        const submitValue = values;
        submitValue.povertyAlleviationAgencyId = metaData.povertyAlleviationAgencyId;

        dispatch({
          type: 'povertyalleviationagencyuser/updatecurrentbasicinfo',
          payload: submitValue,
        }).then(() => {
          const {
            povertyalleviationagencyuser: { data },
          } = this.props;
          const { status } = data;
          this.setState({ saving: false });
          if (status === 200) {
            this.setState({ metaData: data });
          }
        });
      }
    });
  };

  handleFormReset = () => {
    const { dispatch, form } = this.props;
    form.resetFields();
    dispatch({
      type: 'povertyalleviationagencyuser/getcurrent',
      payload: {},
    }).then(() => {
      const {
        povertyalleviationagencyuser: { data },
      } = this.props;
      this.setState({ metaData: data });
      this.setState({ saving: false });
    });
  };

  render() {
    const { loading } = this.props;
    const { metaData, saving } = this.state;

    const props = {
      name: 'file',
      multiple: true,
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange(info) {
        const { file } = info;
        const { status } = file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <Fragment>
        <Card
          title="设置头像"
          style={{ marginBottom: 24 }}
          bordered={false}
          extra={
            <Button type="primary" icon="save" onClick={this.handleSubmit}>
              保存
            </Button>
          }
        >
          <Spin spinning={loading || saving}>
            {metaData.name}
            <Row gutter={24}>
              <Col className="gutter-row" span={4}>
                <div className="gutter-box" />
              </Col>
              <Col className="gutter-row" span={16}>
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company
                    data or other band files
                  </p>
                </Dragger>
              </Col>
              <Col className="gutter-row" span={4}>
                <div className="gutter-box" />
              </Col>
            </Row>
          </Spin>
        </Card>
        <BackTop />
      </Fragment>
    );
  }
}
