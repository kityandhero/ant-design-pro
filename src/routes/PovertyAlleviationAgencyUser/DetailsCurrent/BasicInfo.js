import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Card,
  Alert,
  Button,
  Form,
  Row,
  Col,
  Input,
  Spin,
  BackTop,
  Divider,
  notification,
} from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

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
    const {
      dispatch,
      form,
      location: { pathname },
    } = this.props;
    const { metaData } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ saving: true });
        const submitValue = values;
        submitValue.image = metaData.image;

        dispatch({
          type: 'povertyalleviationagencyuser/updatecurrentbasicinfo',
          payload: submitValue,
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
      }
    });
  };

  // handleFormReset = () => {
  //   const { dispatch, form } = this.props;
  //   form.resetFields();
  //   dispatch({
  //     type: 'povertyalleviationagencyuser/getcurrent',
  //     payload: {},
  //   }).then(() => {
  //     const {
  //       povertyalleviationagencyuser: { data },
  //     } = this.props;
  //     this.setState({ metaData: data });
  //     this.setState({ saving: false });
  //   });
  // };

  render() {
    const { form, loading } = this.props;
    const { metaData, saving } = this.state;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Fragment>
        <Card
          title="基本信息"
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
                <Alert
                  showIcon
                  message="操作提示：在此设定当前机构的基本信息，设定完记得保存呦。"
                  type="warning"
                />
              </Col>
              <Col className="gutter-row" span={4}>
                <div className="gutter-box" />
              </Col>
            </Row>
            <Form onSubmit={this.handleSubmit}>
              <Divider>基本信息</Divider>
              <FormItem {...formItemLayout} label="登陆账户">
                {getFieldDecorator('loginName', {
                  rules: [{ required: false, message: '请输入登陆账户!' }],
                  initialValue: metaData.loginName || '',
                })(<Input disabled />)}
              </FormItem>
              <FormItem {...formItemLayout} label="姓名">
                {getFieldDecorator('name', {
                  rules: [{ required: false, message: '请输入姓名!' }],
                  initialValue: metaData.name || '',
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="所属机构">
                {getFieldDecorator('povertyAlleviationAgencyName', {
                  rules: [{ required: false, message: '请输入所属机构!' }],
                  initialValue: metaData.povertyAlleviationAgencyName || '',
                })(<Input disabled />)}
              </FormItem>
              <FormItem {...formItemLayout} label="拥有角色">
                {getFieldDecorator('povertyAlleviationAgencyUserRoleName', {
                  rules: [{ required: false, message: '请输入拥有角色!' }],
                  initialValue: metaData.povertyAlleviationAgencyUserRoleName || '',
                })(<Input disabled />)}
              </FormItem>
              <Divider>附属信息</Divider>
              <FormItem {...formItemLayout} label="简介描述" hasFeedback>
                {getFieldDecorator('description', {
                  rules: [{ required: false, message: '请输入简介描述!' }],
                  initialValue: metaData.description || '',
                })(<TextArea placeholder="请输入简介描述" autosize={{ minRows: 5, maxRows: 8 }} />)}
              </FormItem>
              <Divider>其他信息</Divider>
              <FormItem {...formItemLayout} label="账户状态">
                {getFieldDecorator('statusNote', {
                  rules: [{ required: false, message: '请输入账户状态!' }],
                  initialValue: metaData.statusNote || '',
                })(<Input disabled />)}
              </FormItem>
              <FormItem {...formItemLayout} label="创建时间">
                {getFieldDecorator('createTime', {
                  rules: [{ required: false, message: '请输入创建时间!' }],
                  initialValue: metaData.createTime || '',
                })(<Input disabled />)}
              </FormItem>
            </Form>
          </Spin>
        </Card>
        <BackTop />
      </Fragment>
    );
  }
}
