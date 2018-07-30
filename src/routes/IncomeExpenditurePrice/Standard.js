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
  Divider,
  BackTop,
} from 'antd';
import StandardTableCustom from 'components/StandardTableCustom';
import StandardModal from './StandardModal';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getCurrentUrlInfo } from '../../utils/tools';

import styles from './Standard.less';

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

@connect(({ incomeexpenditureprice, loading }) => ({
  incomeexpenditureprice,
  loading: loading.models.incomeexpenditureprice,
}))
@Form.create()
export default class Standard extends PureComponent {
  state = {
    formValues: {},
    type: 0,
    category: 2001,
    // dataLoading: true,
    pageTitle: '',
    mounted: false,
    addnewvisible: false,
    updateitemvisible: false,
    metaData: {},
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
    const currentUrl = getCurrentUrlInfo(routerData, pathname);
    const { name } = currentUrl;
    this.setState({ pageTitle: name });
    this.setState({ type });
    this.setState({ category });
    dispatch({
      type: 'incomeexpenditureprice/fetch',
      payload: { type, category },
    }).then(() => {
      this.setState({ mounted: true });
      const {
        incomeexpenditureprice: { data },
      } = this.props;
      this.setState({ customData: data });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { location, routerData } = nextProps;
    const { pathname } = location;
    const currentUrl = getCurrentUrlInfo(routerData, pathname);
    const { name } = currentUrl;
    this.setState({ pageTitle: name });
    const { params } = nextProps.match;
    const nextType = params.type;
    const nextCategory = params.category;
    const { type, category, mounted } = this.state;
    if (mounted) {
      if (type !== nextType || category !== nextCategory) {
        // console.dir(nextProps);
        // console.dir({
        //   type,
        //   category,
        //   nextType,
        //   nextCategory,
        // });
        this.setState({ type: nextType });
        this.setState({ category: nextCategory });
        const { dispatch } = nextProps;
        dispatch({
          type: 'incomeexpenditureprice/fetch',
          payload: {
            type: nextType,
            category: nextCategory,
          },
        }).then(() => {
          const {
            incomeexpenditureprice: { data },
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
      type: 'incomeexpenditureprice/fetch',
      payload: params,
    }).then(() => {
      const {
        incomeexpenditureprice: { data },
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
      type: 'incomeexpenditureprice/fetch',
      payload: {
        type,
        category,
      },
    }).then(() => {
      const {
        incomeexpenditureprice: { data },
      } = this.props;
      this.setState({ customData: data });
    });
  };

  handleEditClick = record => {
    this.setState({ metaData: record });
    this.setState({ updateitemvisible: true });
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
      type: 'incomeexpenditureprice/fetch',
      payload: params,
    }).then(() => {
      const {
        incomeexpenditureprice: { data },
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
        type: 'incomeexpenditureprice/fetch',
        payload: {
          ...values,
          type,
          category,
        },
      }).then(() => {
        const {
          incomeexpenditureprice: { data },
        } = this.props;
        this.setState({ customData: data });
      });
    });
  };

  showAddNewModal = () => {
    this.setState({
      addnewvisible: true,
    });
  };

  afterAddNewModalOk = () => {
    this.setState({
      addnewvisible: false,
    });
    this.refreshGrid();
  };

  afterAddNewModalCanel = () => {
    this.setState({
      addnewvisible: false,
    });
  };

  afterUpdateItemModalOk = () => {
    this.setState({
      updateitemvisible: false,
    });
    const { customData } = this.state;
    const { pagination } = customData;
    const { current } = pagination;
    this.refreshGrid(current);
  };

  afterUpdateItemModalCanel = () => {
    this.setState({
      updateitemvisible: false,
    });
  };

  renderSimpleForm() {
    const { form, dispatch } = this.props;
    const { addnewvisible } = this.state;
    const { getFieldDecorator } = form;
    const { category } = this.state;
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
              <Divider type="vertical" />
              <Button type="primary" onClick={this.showAddNewModal}>
                新增标准
              </Button>
              <StandardModal
                visible={addnewvisible}
                mode="add"
                category={category}
                dispatch={dispatch}
                afterOK={this.afterAddNewModalOk}
                afterCancel={this.afterAddNewModalCanel}
              />
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
    const { loading, dispatch } = this.props;
    const { customData, metaData, updateitemvisible, category, pageTitle } = this.state;
    const scroll = {
      x: 1000,
    };
    const columns = [
      {
        title: 'Id',
        dataIndex: 'incomeExpenditurePriceId',
        width: 60,
        align: 'center',
        fixed: 'left',
      },
      {
        title: '名称',
        dataIndex: 'name',
        width: 120,
        align: 'center',
        fixed: 'left',
        render: (val, record) => (
          <Fragment>
            <Tooltip placement="right" title={`${record.name} ${record.description}`}>
              <span className="oneLineText">{val}</span>
            </Tooltip>
          </Fragment>
        ),
      },
      {
        title: '类型',
        dataIndex: 'categoryName',
        align: 'center',
        render: val => (
          <Fragment>
            <Tooltip placement="right" title={val}>
              <span className="oneLineText">{val}</span>
            </Tooltip>
          </Fragment>
        ),
      },
      {
        title: '单位',
        dataIndex: 'unitName',
        align: 'center',
        render: val => (
          <Fragment>
            <Tooltip placement="right" title={val}>
              <span className="oneLineText">{val}</span>
            </Tooltip>
          </Fragment>
        ),
      },
      {
        title: '最高价',
        dataIndex: 'max',
        align: 'center',
        render: val => (
          <Fragment>
            <Tooltip placement="right" title={val}>
              <span className="oneLineText">{val}</span>
            </Tooltip>
          </Fragment>
        ),
      },
      {
        title: '最低价',
        dataIndex: 'min',
        align: 'center',
        render: val => (
          <Fragment>
            <Tooltip placement="right" title={val}>
              <span className="oneLineText">{val}</span>
            </Tooltip>
          </Fragment>
        ),
      },
      {
        title: '均价',
        dataIndex: 'average',
        align: 'center',
        render: val => (
          <Fragment>
            <Tooltip placement="right" title={val}>
              <span className="oneLineText">{val}</span>
            </Tooltip>
          </Fragment>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
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
      <PageHeaderLayout title={`${pageTitle}标准列表`}>
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
        <StandardModal
          visible={updateitemvisible}
          mode="update"
          metaData={metaData}
          category={category}
          dispatch={dispatch}
          afterOK={this.afterUpdateItemModalOk}
          afterCancel={this.afterUpdateItemModalCanel}
        />
        <BackTop />
      </PageHeaderLayout>
    );
  }
}
