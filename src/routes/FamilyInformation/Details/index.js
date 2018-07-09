import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Route, routerRedux, Switch } from 'dva/router';
import { Button, Row, Col } from 'antd';
import DescriptionList from '../../../components/DescriptionList';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { getRoutes } from '../../../utils/utils';
import styles from './style.less';

const params = {
  familyId: 1000,
};

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
    key: 'incomeexpenditureyearstatistic',
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
  // state = {
  //   expandForm: false,
  //   selectedRows: [],
  //   formValues: {},
  // };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'familyinformation/fetch',
      payload: params,
    });
  }

  handleTabChange = key => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'basicinfo':
        dispatch(routerRedux.push(`${match.url}/basicinfo`));
        break;
      case 'memberinfo':
        dispatch(routerRedux.push(`${match.url}/memberinfo`));
        break;
      case 'incomeexpenditureyearstatistic':
        dispatch(routerRedux.push(`${match.url}/incomeexpenditureyearstatistic`));
        break;
      case 'familyinformationproperty':
        dispatch(routerRedux.push(`${match.url}/familyinformationproperty`));
        break;
      case 'helpmeasuresandresult':
        dispatch(routerRedux.push(`${match.url}/helpmeasuresandresult`));
        break;
      case 'informationchangelog':
        dispatch(routerRedux.push(`${match.url}/informationchangelog`));
        break;
      default:
        break;
    }
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
        tabActiveKey={location.hash.replace(`#${match.path}/`, '')}
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
