import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Form, Spin, Button, BackTop } from 'antd';

// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

@connect(({ povertyalleviationagency, loading }) => ({
  povertyalleviationagency,
  loading: loading.models.povertyalleviationagency,
}))
@Form.create()
class ContentInfo extends PureComponent {
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
      type: 'povertyalleviationagency/getcurrent',
      payload: {},
    }).then(() => {
      const {
        povertyalleviationagency: { data },
      } = this.props;
      this.setState({ metaData: data });
    });
  }

  // handleChange = (content) => {
  //   console.log(content)
  // }

  // handleRawChange = (rawContent) => {
  //   console.log(rawContent)
  // }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const content = this.editorInstance.getContent();
    this.setState({ saving: true });
    dispatch({
      type: 'povertyalleviationagency/updatecurrentcontent',
      payload: {
        content,
        ajax: 1,
      },
    }).then(() => {
      const {
        povertyalleviationagency: { data },
      } = this.props;
      const { status } = data;
      this.setState({ saving: false });
      if (status === 200) {
        this.setState({ metaData: data });
      }
    });
  };

  render() {
    const { loading } = this.props;
    const { metaData, saving } = this.state;
    const { content } = metaData;
    const editorProps = {
      height: 500,
      contentFormat: 'html',
      initialContent: content,
      // onChange: this.handleChange,
      // onRawChange: this.handleRawChange
    };
    return (
      <Fragment>
        <Card
          title="详情信息"
          style={{ marginBottom: 24 }}
          bordered={false}
          extra={
            <Button type="primary" icon="save" onClick={this.handleSubmit}>
              保存
            </Button>
          }
        >
          <Spin spinning={loading || saving}>
            <div
              style={{
                border: '1px solid #ccc',
              }}
            >
              <BraftEditor
                {...editorProps}
                ref={instance => {
                  this.editorInstance = instance;
                  console.dir(instance);
                }}
              />
            </div>
          </Spin>
        </Card>
        <BackTop />
      </Fragment>
    );
  }
}

export default ContentInfo;
