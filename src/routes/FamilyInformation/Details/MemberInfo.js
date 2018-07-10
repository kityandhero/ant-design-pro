import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { MemberItem } from './MemberItem';

const params = {
  familyId: 1000,
};

@connect(({ familyinformation, loading }) => ({
  familyinformation,
  loading: loading.models.familyinformation,
}))
@Form.create()
export default class BasicInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataLoading: true,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'familyinformation/fetch',
      payload: params,
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
