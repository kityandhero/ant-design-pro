import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Route, routerRedux, Switch } from 'dva/router';
import {
  Row,
  Col,
  Avatar,
  // Button,
} from 'antd';
import DescriptionList from '../../../components/DescriptionList';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { getRoutes } from '../../../utils/utils';
import styles from './style.less';

const { Description } = DescriptionList;
// const ButtonGroup = Button.Group;

const tabList = [
  {
    key: 'basicinfo',
    tab: '基本信息',
  },
  {
    key: 'avatarinfo',
    tab: '设置头像',
  },
  {
    key: 'passwordinfo',
    tab: '登陆密码',
  },
  {
    key: 'contentinfo',
    tab: '详情信息',
  },
];

@connect(({ povertyalleviationagencyuser, loading }) => ({
  povertyalleviationagencyuser,
  loading: loading.models.povertyalleviationagencyuser,
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
      type: 'povertyalleviationagencyuser/getcurrent',
      payload: {},
    }).then(() => {
      this.setState({ dataLoaging: false });
      this.setState({ mounted: true });
      const {
        povertyalleviationagencyuser: { data },
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
          type: 'povertyalleviationagencyuser/getcurrent',
          payload: {},
        }).then(() => {
          this.setState({ dataLoaging: false });
          const {
            povertyalleviationagencyuser: { data },
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
      case 'avatarinfo':
        location = {
          pathname: `${match.url.replace('/update', '/load')}/avatarinfo`,
        };
        break;
      case 'passwordinfo':
        location = {
          pathname: `${match.url.replace('/update', '/load')}/passwordinfo`,
        };
        break;
      case 'contentinfo':
        location = {
          pathname: `${match.url.replace('/update', '/load')}/contentinfo`,
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
        title={`登录账户：${metaData.loginName || ''}`}
        logo={<Avatar size="large" src={metaData.image} />}
        // action={(
        //   <Fragment>
        //     <ButtonGroup>
        //       <Button>操作</Button>
        //       <Button>操作</Button>
        //     </ButtonGroup>
        //     <Button type="primary">主操作</Button>
        //   </Fragment>
        // )}
        loading={dataLoaging}
        tabActiveKey={location.hash.replace(`#${match.url}/`, '')}
        content={
          <DescriptionList className={styles.headerList} size="small" col="2">
            <Description term="姓名">{metaData.name}</Description>
            <Description term="所属机构">{metaData.povertyAlleviationAgencyName}</Description>
            <Description term="创建时间">{metaData.createTime}</Description>
            <Description term="最后登录时间">{metaData.lastLoginTime}</Description>
            <Description term="最后登陆IP"> {metaData.lastLoginIp} </Description>
            <Description term="最后登录地区">{metaData.lastLoginArea}</Description>
          </DescriptionList>
        }
        extraContent={
          <Row>
            <Col xs={24} sm={12}>
              <div className={styles.textSecondary}>拥有权限</div>
              <div className={styles.heading}>{metaData.roleName}</div>
            </Col>
            <Col xs={24} sm={12}>
              <div className={styles.textSecondary}>账户状态</div>
              <div className={styles.heading}>{metaData.statusNote}</div>
            </Col>
          </Row>
        }
        tabList={tabList}
        onTabChange={this.handleTabChange}
      >
        <Switch>
          {routes.map(item => {
            return (
              <Route
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            );
          })}
        </Switch>
      </PageHeaderLayout>
    );
  }
}
