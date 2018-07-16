import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, Badge, BackTop } from 'antd';
import StandardTableCustom from 'components/StandardTableCustom';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';
import { getCurrentUrlInfo } from '../../utils/tools';

import styles from './List.less';

const FormItem = Form.Item;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

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
export default class ListForCurrentPovertyAlleviationAgency extends PureComponent {
  state = {
    formValues: {},
    mounted: false,
    pageTitle: '',
    customData: {
      count: 0,
      list: [],
      pagination: {},
    },
  };

  componentDidMount() {
    const { dispatch, match, location, routerData } = this.props;
    const { pathname } = location;
    const { params } = match;
    const { type, category } = params;
    // console.dir(routerData);
    const currentUrl = getCurrentUrlInfo(routerData, pathname);
    const { name } = currentUrl;
    this.setState({ pageTitle: name });
    this.setState({ type });
    this.setState({ category });
    dispatch({
      type: 'povertyalleviationagencyuserloginlog/listforpovertyalleviationagency',
      payload: { type, category },
    }).then(() => {
      this.setState({ mounted: true });
      const {
        povertyalleviationagencyuserloginlog: { data },
      } = this.props;
      this.setState({ customData: data });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps.match;
    const nextType = params.type;
    const nextCategory = params.category;
    const { type, category, mounted } = this.state;
    if (mounted) {
      if (type !== nextType || category !== nextCategory) {
        this.setState({ type: nextType });
        this.setState({ category: nextCategory });
        const { dispatch } = nextProps;
        dispatch({
          type: 'povertyalleviationagencyuserloginlog/listforpovertyalleviationagency',
          payload: {
            type: nextType,
            category: nextCategory,
          },
        }).then(() => {
          const {
            povertyalleviationagencyuserloginlog: { data },
          } = this.props;
          this.setState({ customData: data });
        });
      }
    }
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues, type, category } = this.state;
    // console.dir(pagination);
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
      type,
      category,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'povertyalleviationagencyuserloginlog/listforpovertyalleviationagency',
      payload: params,
    }).then(() => {
      const {
        povertyalleviationagencyuserloginlog: { data },
      } = this.props;
      this.setState({ customData: data });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    const { type, category } = this.state;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'povertyalleviationagencyuserloginlog/listforpovertyalleviationagency',
      payload: {
        type,
        category,
      },
    }).then(() => {
      const {
        povertyalleviationagencyuserloginlog: { data },
      } = this.props;
      this.setState({ customData: data });
    });
  };

  refreshGrid = pageNo => {
    const { dispatch } = this.props;
    const { customData, type, category } = this.state;
    const { pagination } = customData;

    const params = {
      pageNo: (pageNo || 1) <= 1 ? 1 : pageNo,
      pageSize: pagination.pageSize,
      type,
      category,
    };
    dispatch({
      type: 'povertyalleviationagencyuserloginlog/listforpovertyalleviationagency',
      payload: params,
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
    const { type, category } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'povertyalleviationagencyuserloginlog/listforpovertyalleviationagency',
        payload: {
          ...values,
          type,
          category,
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
    const columns = [
      {
        title: 'ID',
        dataIndex: 'povertyAlleviationAgencyUserLoginLogId',
        width: 80,
        align: 'center',
      },
      {
        title: '登录名',
        dataIndex: 'loginName',
        width: 140,
        align: 'center',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: 100,
        align: 'center',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '拥有角色',
        dataIndex: 'povertyAlleviationAgencyUserRoleName',
        width: 100,
        align: 'center',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '所属机构',
        dataIndex: 'povertyAlleviationAgencyName',
        width: 140,
        align: 'center',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '机构管辖地区',
        dataIndex: 'provinceName',
        align: 'center',
        render: (val, record) => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {`${record.provinceName} ${record.cityName} ${record.districtName} ${
                record.areaName
              }`}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '登陆时间',
        width: 150,
        dataIndex: 'loginTime',
        align: 'center',
        sorter: false,
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '状态',
        width: 100,
        dataIndex: 'status',
        align: 'center',
        filters: status,
        filterMultiple: false,
        onFilter: (value, record) => record.status.toString() === value,
        render(val, record) {
          let badgeValue = '';
          status.forEach(item => {
            const { badge, value } = item;
            if (value === val) {
              badgeValue = badge;
            }
          });
          return <Badge status={badgeValue} text={record.statusNote} />;
        },
      },
    ];

    // const { type, category } = this.props.match.params;
    // console.dir(this.props);
    return (
      <PageHeaderLayout title={`${pageTitle}列表`}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTableCustom
              loading={loading}
              data={customData}
              columns={columns}
              expandedRowRender={record => (
                <div>
                  <p>
                    <span className="bold">间接描述：</span>
                    {record.description}
                  </p>
                </div>
              )}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <BackTop />
      </PageHeaderLayout>
    );
  }
}
