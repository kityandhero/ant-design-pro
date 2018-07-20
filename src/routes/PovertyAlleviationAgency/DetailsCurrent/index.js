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
    tab: '基本信息',
  },
  {
    key: 'contentinfo',
    tab: '详情信息',
  },
  {
    key: 'informationchangeloglist',
    tab: '操作记录',
  },
  {
    key: 'povertyalleviationagencyuserloginloglist',
    tab: '登陆记录',
  },
];

@connect(({ povertyalleviationagency, loading }) => ({
  povertyalleviationagency,
  loading: loading.models.povertyalleviationagency,
}))
export default class DetailsCurrent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      metaData: {},
      dataLoaging: false,
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
    const { dispatch } = this.props;
    this.setState({ dataLoaging: true });
    dispatch({
      type: 'povertyalleviationagency/getcurrent',
      payload: {},
    }).then(() => {
      this.setState({ dataLoaging: false });
      this.setState({ mounted: true });
      const {
        povertyalleviationagency: { data },
      } = this.props;
      this.setState({ metaData: data });
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { op },
      },
    } = nextProps;
    const { dispatch } = this.props;
    const { mounted, dataLoaging } = this.state;
    if (mounted && !dataLoaging) {
      if (op === 'update') {
        this.setState({ dataLoaging: true });
        dispatch({
          type: 'povertyalleviationagency/getcurrent',
          payload: {},
        }).then(() => {
          this.setState({ dataLoaging: false });
          const {
            povertyalleviationagency: { data },
          } = this.props;
          this.setState({ metaData: data });
        });
      }
    }
  }

  handleTabChange = key => {
    const { dispatch, match } = this.props;
    let location = {};
    switch (key) {
      case 'basicinfo':
        location = {
          pathname: `${match.url.replace('/update', '/load')}/basicinfo`,
        };
        break;
      case 'contentinfo':
        location = {
          pathname: `${match.url.replace('/update', '/load')}/contentinfo`,
        };
        break;
      case 'informationchangeloglist':
        location = {
          pathname: `${match.url.replace('/update', '/load')}/informationchangeloglist`,
        };
        break;
      case 'povertyalleviationagencyuserloginloglist':
        location = {
          pathname: `${match.url.replace(
            '/update',
            '/load'
          )}/povertyalleviationagencyuserloginloglist`,
        };
        break;
      default:
        break;
    }
    dispatch(routerRedux.push(location));
  };

  render() {
    const { match, routerData } = this.props;
    const { metaData, dataLoaging } = this.state;
    const routes = getRoutes(match.path, routerData);
    return (
      <PageHeaderLayout
        title={`名称：${metaData.name || ''}`}
        loading={dataLoaging}
        tabActiveKey={location.hash.replace(`#${match.url}/`, '')}
        content={
          <Row gutter={24}>
            <Col span={8} />
            <Col span={20}>
              <DescriptionList className={styles.headerList} size="small" col="1">
                <Description term="间接描述">{metaData.description || ''}</Description>
                <Description term="状态">{metaData.statusNote || ''}</Description>
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
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}
        </Switch>
      </PageHeaderLayout>
    );
  }
}
