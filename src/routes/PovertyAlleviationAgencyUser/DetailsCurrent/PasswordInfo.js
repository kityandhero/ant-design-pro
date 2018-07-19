import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Card,
  // Alert,
  Button,
  Form,
  // Row,
  // Col,
  Input,
  Spin,
  BackTop,
  // Divider,
  notification,
  message,
} from 'antd';

// const { TextArea } = Input;
const FormItem = Form.Item;

@connect(({ povertyalleviationagencyuser, loading }) => ({
  povertyalleviationagencyuser,
  loading: loading.models.povertyalleviationagencyuser,
}))
@Form.create()
export default class PasswordInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // metaData: {},
      saving: false,
    };
  }

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'povertyalleviationagencyuser/getcurrent',
    //   payload: {},
    // }).then(() => {
    //   const {
    //     povertyalleviationagencyuser: { data },
    //   } = this.props;
    //   this.setState({ metaData: data });
    // });
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      dispatch,
      form,
      location: { pathname },
    } = this.props;
    // const { metaData } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        if (values.password.length < 6) {
          message.error('密码最低6个字符！');
          return;
        }

        if (values.password !== values.rePassword) {
          message.error('两次密码输入不一致！');
          return;
        }

        this.setState({ saving: true });
        dispatch({
          type: 'povertyalleviationagencyuser/updatecurrentpassword',
          payload: {
            password: values.password,
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
              description: '密码重置成功，请进行后续操作。',
            });
            form.resetFields();
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

  render() {
    const { form, loading } = this.props;
    // const { metaData, saving } = this.state;
    const { saving } = this.state;
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
          title="重置登陆密码"
          style={{ marginBottom: 24 }}
          bordered={false}
          extra={
            <Button type="primary" icon="save" onClick={this.handleSubmit}>
              保存
            </Button>
          }
        >
          <Spin spinning={loading || saving}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="登陆密码">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入登陆密码!' }],
                  initialValue: '',
                })(<Input type="password" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="确认密码">
                {getFieldDecorator('rePassword', {
                  rules: [{ required: true, message: '请再次输入登陆密码!' }],
                  initialValue: '',
                })(<Input type="password" />)}
              </FormItem>
            </Form>
          </Spin>
        </Card>
        <BackTop />
      </Fragment>
    );
  }
}
