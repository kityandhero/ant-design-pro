import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Route, routerRedux, Switch } from 'dva/router';
import { Button, Row, Col } from 'antd';
import DescriptionList from '../../../components/DescriptionList';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { getRoutes, getPageQuery } from '../../../utils/utils';
import styles from './style.less';

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
const action = (
  <Fragment>
    <ButtonGroup>
      <Button>操作</Button>
      <Button>操作</Button>
    </ButtonGroup>
    <Button type="primary">主操作</Button>
  </Fragment>
);

const tabList = [
  {
    key: 'basicinfo',
    tab: '基本资料',
  },
  {
    key: 'memberinfo',
    tab: '家庭成员',
  },
  {
    key: 'incomeexpenditureinfo',
    tab: '收支状况',
  },
  {
    key: 'familyinformationproperty',
    tab: '产业信息',
  },
  {
    key: 'helpmeasuresandresult',
    tab: '帮扶措施',
  },
  {
    key: 'informationchangelog',
    tab: '操作记录',
  },
];

@connect(({ familyinformation, loading }) => ({
  familyinformation,
  loading: loading.models.familyinformation,
}))
export default class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      familyId: 0,
    };
  }

  componentDidMount() {
    var queryData = getPageQuery();
    let familyId = queryData.familyId || 0;
    this.setState({ familyId });
    const { dispatch } = this.props;
    dispatch({
      type: 'familyinformation/fetch',
      payload: { familyId },
    });
  }

  handleTabChange = key => {
    const { dispatch, match } = this.props;
    const { familyId } = this.state;
    let location;
    switch (key) {
      case 'basicinfo':
        location = {
          pathname: `${match.url}/basicinfo`,
          search: `?familyId=${familyId}`,
        };
        break;
      case 'memberinfo':
        location = {
          pathname: `${match.url}/memberinfo`,
          search: `?familyId=${familyId}`,
        };
        break;
      case 'incomeexpenditureinfo':
        location = {
          pathname: `${match.url}/incomeexpenditureinfo`,
          search: `?familyId=${familyId}`,
        };
        break;
      case 'familyinformationproperty':
        location = {
          pathname: `${match.url}/familyinformationproperty`,
          search: `?familyId=${familyId}`,
        };
        break;
      case 'helpmeasuresandresult':
        location = {
          pathname: `${match.url}/helpmeasuresandresult`,
          search: `?familyId=${familyId}`,
        };
        break;
      case 'informationchangelog':
        location = {
          pathname: `${match.url}/informationchangelog`,
          search: `?familyId=${familyId}`,
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
      familyinformation: { data },
      // loading,
    } = this.props;
    const routes = getRoutes(match.path, routerData);
    return (
      <PageHeaderLayout
        title={`户主：${data.name}`}
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        action={action}
        tabActiveKey={location.hash
          .substring(0, location.hash.lastIndexOf('?'))
          .replace(`#${match.path}/`, '')}
        content={
          <DescriptionList className={styles.headerList} size="small" col="2">
            <Description term="户籍">{data.address}</Description>
            <Description term="致贫原因">{data.mainPoorReasonNote}</Description>
            <Description term="脱贫状态">{data.shakeOffPovertyNote}</Description>
            <Description term="家庭人口">{data.memberCount}人</Description>
            <Description term="联系方式"> {data.contactPhone} </Description>
            <Description term="导入时间">{data.createTime}</Description>
          </DescriptionList>
        }
        extraContent={
          <Row>
            <Col xs={24} sm={12}>
              <div className={styles.textSecondary}>贫困户属性</div>
              <div className={styles.heading}>{data.poorTypeNote}</div>
            </Col>
            <Col xs={24} sm={12}>
              <div className={styles.textSecondary}>年人均纯收入</div>
              <div className={styles.heading}>¥ {data.perCapitaIncome}</div>
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
