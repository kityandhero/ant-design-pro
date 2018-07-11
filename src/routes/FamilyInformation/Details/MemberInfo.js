import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { MemberItem } from './MemberItem';
import { getPageQuery } from '../../../utils/utils';

@connect(({ familyinformation, loading }) => ({
  familyinformation,
  loading: loading.models.familyinformation,
}))
@Form.create()
export default class BasicInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      familyId: 0,
      dataLoading: true,
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
    }).then(() => {
      this.setState({ dataLoading: false });
    });
  }

  render() {
    const {
      dispatch,
      familyinformation: { data },
      // loading,
    } = this.props;
    const { dataLoading } = this.state;
    let memberList = data.memberList || [];
    memberList = memberList.map(item => {
      const v = item;
      v.key = item.personnelId;
      return v;
    });
    return (
      <Fragment>
        {memberList.map(item => {
          return (
            <MemberItem
              key={item.key}
              memberData={item}
              dataLoading={dataLoading}
              dispatch={dispatch}
            />
          );
        })}
      </Fragment>
    );
  }
}
