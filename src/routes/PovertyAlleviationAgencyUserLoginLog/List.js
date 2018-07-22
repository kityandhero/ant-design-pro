import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, BackTop } from 'antd';
import TimeLineCustom from 'components/TimeLineCustom';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getCurrentUrlInfo } from '../../utils/tools';

import styles from './List.less';

const FormItem = Form.Item;

const status = [
  {
    key: -10000,
    badge: 'default',
    text: '不限',
    value: -10000,
  },
  {
    key: 2,
    badge: 'success',
    text: '正常',
    value: 2,
  },
];

@connect(({ povertyalleviationagencyuserloginlog, loading }) => ({
  povertyalleviationagencyuserloginlog,
  loading: loading.models.povertyalleviationagencyuserloginlog,
}))
@Form.create()
export default class List extends PureComponent {
  state = {
    formValues: {},
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
    const { formValues } = this.state;

    const params = {
      pageNo,
      pageSize,
      ...formValues,
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

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    const { pageNo, pageSize } = this.state;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.setState({
      pageNo: 1,
    });
    dispatch({
      type: 'povertyalleviationagencyuserloginlog/list',
      payload: {
        pageNo,
        pageSize,
      },
    }).then(() => {
      const {
        povertyalleviationagencyuserloginlog: { data },
      } = this.props;
      this.setState({ customData: data });
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    const { pageNo, pageSize } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      this.setState({
        pageNo: 1,
      });

      dispatch({
        type: 'povertyalleviationagencyuserloginlog/list',
        payload: {
          ...values,
          pageNo,
          pageSize,
        },
      }).then(() => {
        const {
          povertyalleviationagencyuserloginlog: { data },
        } = this.props;
        this.setState({ customData: data });
      });
    });
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const statusOption = [];
    status.forEach(item => {
      const { text, value } = item;
      statusOption.push(
        <Select.Option key={value} value={value}>
          {text}
        </Select.Option>
      );
    });

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={6} sm={24}>
            <FormItem label="关键词">
              {getFieldDecorator('keywords')(<Input placeholder="请输入需要搜索的内容" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status', {
                rules: [{ required: false, message: '请选择使用状态!' }],
                initialValue: status[0].value,
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {statusOption}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const { loading } = this.props;
    const { customData, pageTitle } = this.state;

    return (
      <PageHeaderLayout title={`${pageTitle}列表`}>
        <Card style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
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
