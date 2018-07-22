import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  // Dropdown,
  // Menu,
  // InputNumber,
  // DatePicker,
  Tooltip,
  // Modal,
  // Modal,
  // message,
  Badge,
  // Divider,
  BackTop,
} from 'antd';
import StandardTableCustom from 'components/StandardTableCustom';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';
import { getCurrentUrlInfo } from '../../utils/tools';

import styles from './List.less';

const FormItem = Form.Item;
// const { Option } = Select;
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
  {
    key: -2,
    badge: 'error',
    text: '已禁用',
    value: -2,
  },
];

@connect(({ povertyalleviationagency, loading }) => ({
  povertyalleviationagency,
  loading: loading.models.povertyalleviationagency,
}))
@Form.create()
export default class List extends PureComponent {
  state = {
    formValues: {},
    mounted: false,
    pageTitle: '',
    customData: {
      count: 0,
      list: [],
      pagination: {},
    },
    pageSize: 10,
  };

  componentDidMount() {
    const { dispatch, match, location, routerData } = this.props;
    const { pathname } = location;
    const { params } = match;
    const { type, category } = params;
    const currentUrl = getCurrentUrlInfo(routerData, pathname);
    const { name } = currentUrl;
    const { pageSize } = this.state;
    this.setState({ pageTitle: name });
    this.setState({ type });
    this.setState({ category });
    dispatch({
      type: 'povertyalleviationagency/list',
      payload: { type, category, pageSize },
    }).then(() => {
      this.setState({ mounted: true });
      const {
        povertyalleviationagency: { data },
      } = this.props;
      this.setState({ customData: data });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps.match;
    const nextType = params.type;
    const nextCategory = params.category;
    const { type, category, mounted, pageSize } = this.state;
    if (mounted) {
      if (type !== nextType || category !== nextCategory) {
        this.setState({ type: nextType });
        this.setState({ category: nextCategory });
        const { dispatch } = nextProps;
        dispatch({
          type: 'povertyalleviationagency/list',
          payload: {
            type: nextType,
            category: nextCategory,
            pageSize,
          },
        }).then(() => {
          const {
            povertyalleviationagency: { data },
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
      type: 'povertyalleviationagency/list',
      payload: params,
    }).then(() => {
      const {
        povertyalleviationagency: { data },
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
      type: 'povertyalleviationagency/list',
      payload: {
        type,
        category,
      },
    }).then(() => {
      const {
        povertyalleviationagency: { data },
      } = this.props;
      this.setState({ customData: data });
    });
  };

  handleEditClick = () => {};

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
      type: 'povertyalleviationagency/list',
      payload: params,
    }).then(() => {
      const {
        povertyalleviationagency: { data },
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
        type: 'povertyalleviationagency/list',
        payload: {
          ...values,
          type,
          category,
        },
      }).then(() => {
        const {
          povertyalleviationagency: { data },
        } = this.props;
        this.setState({ customData: data });
      });
    });
  };

  showAddNewModal = () => {};

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
    const scroll = {
      x: 1000,
    };
    const columns = [
      {
        title: 'Id',
        dataIndex: 'povertyAlleviationAgencyId',
        width: 66,
        align: 'center',
        fixed: 'left',
      },
      {
        title: '机构名称',
        dataIndex: 'name',
        width: 120,
        align: 'center',
        fixed: 'left',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '管理等级',
        dataIndex: 'regionalLevelNote',
        width: 120,
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
        title: '直属上级',
        dataIndex: 'parentName',
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
        title: '管辖地区',
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
        title: '账户数量',
        dataIndex: 'userCount',
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
        title: '创建时间',
        dataIndex: 'createTime',
        width: 124,
        align: 'center',
        sorter: false,
        render: val => (
          <Fragment>
            <Tooltip placement="right" title={moment(val).format('YYYY-MM-DD HH:mm:ss')}>
              <span className="oneLineText">{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
            </Tooltip>
          </Fragment>
        ),
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
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
      {
        title: '操作',
        width: 78,
        align: 'center',
        fixed: 'right',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleEditClick(record)}>
              <Icon type="edit" className={styles.editButton} />编辑
            </a>
          </Fragment>
        ),
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
              scroll={scroll}
              loading={loading}
              data={customData}
              columns={columns}
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
