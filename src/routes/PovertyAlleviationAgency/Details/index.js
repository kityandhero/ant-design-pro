import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Route, routerRedux, Switch } from 'dva/router';
import { Row, Col, Spin } from 'antd';
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

@connect(({ povertyalleviationagency, loading }) => ({
  povertyalleviationagency,
  loading: loading.models.povertyalleviationagency,
}))
export default class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // povertyAlleviationAgencyId: 0,
      metaData: {},
    };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;
    const { povertyAlleviationAgencyId } = params;
    // this.setState({ povertyAlleviationAgencyId });
    dispatch({
      type: 'povertyalleviationagency/fetch',
      payload: { povertyAlleviationAgencyId },
    }).then(() => {
      const {
        povertyalleviationagency: { data },
      } = this.props;
      this.setState({ metaData: data });
    });
  }

  handleTabChange = key => {
    const { dispatch, match } = this.props;
    let location = {};
    switch (key) {
      case 'basicinfo':
        location = {
          pathname: `${match.url}/basicinfo`,
        };
        break;
      case 'paraminfo':
        location = {
          pathname: `${match.url}/paraminfo`,
        };
        break;
      default:
        break;
    }
    dispatch(routerRedux.push(location));
  };

  render() {
    const { match, routerData, loading } = this.props;
    const { metaData } = this.state;
    const routes = getRoutes(match.path, routerData);
    return (
      <Spin spinning={loading}>
        <PageHeaderLayout
          title={`信息：${metaData.message || ''}`}
          tabActiveKey={location.hash.replace(`#${match.url}/`, '')}
          content={
            <Row gutter={24}>
              <Col span={8} />
              <Col span={20}>
                <DescriptionList className={styles.headerList} size="small" col="1">
                  <Description term="Url">{metaData.url || ''}</Description>
                  <Description term="访问IP">{metaData.ip || ''}</Description>
                  <Description term="创建时间">{metaData.createTime || ''}</Description>
                </DescriptionList>
              </Col>
            </Row>
          }
          tabList={tabList}
          onTabChange={this.handleTabChange}
        >
          <Switch>
            {routes.map(item => (
              <Route
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ))}
          </Switch>
        </PageHeaderLayout>
      </Spin>
    );
  }
}
