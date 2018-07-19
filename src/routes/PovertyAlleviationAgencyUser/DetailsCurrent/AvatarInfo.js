import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Spin,
  BackTop,
  Upload,
  Icon,
  message,
  notification,
} from 'antd';
import styles from './AvatarInfo.less';

const { Dragger } = Upload;

@connect(({ povertyalleviationagencyuser, loading }) => ({
  povertyalleviationagencyuser,
  loading: loading.models.povertyalleviationagencyuser,
}))
@Form.create()
export default class AvatarInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      metaData: {},
      imageUrl: '',
      saving: false,
      uploading: false,
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
      const { image } = data;
      this.setState({ imageUrl: image });
      this.setState({ metaData: data });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      dispatch,
      location: { pathname },
    } = this.props;
    const { metaData, imageUrl } = this.state;
    this.setState({ saving: true });
    dispatch({
      type: 'povertyalleviationagencyuser/updatecurrentbasicinfo',
      payload: {
        image: imageUrl,
        name: metaData.name,
        description: metaData.description,
      },
    }).then(() => {
      this.setState({ saving: false });
      const {
        povertyalleviationagencyuser: { data },
      } = this.props;
      const { status, message: messageText } = data;
      if (status === 200) {
        notification.success({
          placement: 'bottomRight',
          message: '操作结果',
          description: '数据已经保存成功，请进行后续操作。',
        });
      } else {
        notification.error({
          placement: 'bottomRight',
          message: '操作结果',
          description: messageText,
        });
      }

      dispatch(
        routerRedux.replace({
          pathname: `${pathname.replace('/load/', '/update/')}`,
        })
      );
    });
  };

  handleChange = info => {
    const { metaData } = this.state;
    if (info.file.status === 'uploading') {
      this.setState({ uploading: true });
      return;
    }
    if (info.file.status === 'done') {
      const { response } = info.file;
      const {
        status,
        message: messageText,
        data: { imageUrl },
      } = response;
      if (status === 200) {
        this.setState({ imageUrl });
        metaData.image = imageUrl;
        this.setState({ metaData });
        message.success('上传成功，记得保存哦！');
      } else {
        message.error(messageText);
      }
      this.setState({ uploading: false });
    }
  };

  render() {
    const { loading } = this.props;
    const { imageUrl, saving, uploading } = this.state;

    const props = {
      name: 'image',
      withCredentials: true,
      showUploadList: false,
      action: 'http://sys.pa.com/PovertyAlleviationAgencyUser/UpdateImageToQiNiu',
      headers: {
        key: localStorage.getItem('key') || '',
      },
      onChange: this.handleChange,
    };

    const uploadButton = (
      <Row type="flex" justify="space-around">
        <Col>
          <div className={styles.uploadingBox}>
            <Row type="flex" justify="space-around">
              <Col>
                <div className={styles.innerBox}>
                  <Icon type={uploading ? 'loading' : 'plus'} />
                  <div className={styles.innerBoxText}>上传中</div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );

    const uploadBox = uploading ? (
      uploadButton
    ) : imageUrl === '' ? (
      <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
    ) : (
      <img src={imageUrl} className={styles.avatarBox} alt="avatar" />
    );

    // const uploadBox=uploadButton;

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
            <Row gutter={24}>
              <Col className="gutter-row" span={4}>
                <div className="gutter-box" />
              </Col>
              <Col className="gutter-row" span={16}>
                <Dragger {...props}>
                  {uploadBox}
                  <div className={styles.infoBox}>
                    <p className="ant-upload-text">
                      点击选择图片上传/拖动文件到这里开始上传，上传后记得保存哦！
                    </p>
                    <p className="ant-upload-hint">支持图片格式为 jpg/jpeg，png，gif</p>
                  </div>
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
