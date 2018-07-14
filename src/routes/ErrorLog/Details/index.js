import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Route, routerRedux, Switch } from 'dva/router';
import { Row, Col } from 'antd';
import DescriptionList from '../../../components/DescriptionList';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { getRoutes } from '../../../utils/utils';
import styles from './style.less';

const { Description } = DescriptionList;

const tabList = [
  {
    key: 'basicinfo',
    tab: '基础信息',
  },
  {
    key: 'paraminfo',
    tab: '参数信息',
  },
];

@connect(({ errorlog, loading }) => ({
  errorlog,
  loading: loading.models.errorlog,
}))
export default class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      errorLogId: 0,
      // metaData: {},
    };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;
    const { errorLogId } = params;
    this.setState({ errorLogId });
    dispatch({
      type: 'errorlog/fetch',
      payload: { errorLogId },
    }).then(() => {
      // const {
      //   errorlog: { data },
      // } = this.props;
      // this.setState({ metaData: data });
    });
  }

  handleTabChange = key => {
    const { dispatch, match } = this.props;
    const { errorLogId } = this.state;
    let location;
    switch (key) {
      case 'basicinfo':
        location = {
          pathname: `${match.url}/basicinfo/${errorLogId}`,
        };
        break;
      case 'paraminfo':
        location = {
          pathname: `${match.url}/paraminfo/${errorLogId}`,
        };
        break;
      default:
        break;
    }
    dispatch(routerRedux.push(location));
  };

  render() {
    const {
      match,
      routerData,
      errorlog: { data },
      // loading,
    } = this.props;
    const routes = getRoutes(match.path, routerData);
    return (
      <PageHeaderLayout
        title={`描述：${data.message}`}
        tabActiveKey={location.hash
          .substring(0, location.hash.lastIndexOf('?'))
          .replace(`#${match.path}/`, '')}
        content={
          <Row gutter={24}>
            <Col span={8} />
            <Col span={20}>
              <DescriptionList className={styles.headerList} size="small" col="1">
                <Description term="Url">{data.url}</Description>
                <Description term="访问IP">{data.ip}</Description>
                <Description term="创建时间">{data.createTime}</Description>
              </DescriptionList>
            </Col>
          </Row>
        }
        tabList={tabList}
        onTabChange={this.handleTabChange}
      >
        <Switch>
          {routes.map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}
        </Switch>
      </PageHeaderLayout>
    );
  }
}
