import React, { PureComponent } from 'react';
import moment from 'moment';
import { List, Icon } from 'antd';
import { getRandomColor } from '../../utils/utils';

import styles from './index.less';

class TimeLineCustom extends PureComponent {
  constructor(props) {
    super(props);

    this.currentTime = null;
    this.currentPageStart = true;
  }

  getCreateTimeDatePart = v => {
    return moment(v).format('YYYY-MM-DD');
  };

  getCreateTimeTimePart = v => {
    return moment(v).format('HH:mm');
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    onChange(pagination, filters, sorter);
  };

  renderDateLabel = v => {
    this.currentTime = this.currentTime || v;
    const preTime = this.currentTime || v;
    if (!this.currentPageStart && new Date(preTime).getDay() === new Date(v).getDay()) {
      return false;
    }

    this.currentPageStart = false;
    this.currentTime = v;
    return (
      <div className={`${styles.timelabel} ${styles.liitem}`}>
        <span className={styles.bgred}>{this.getCreateTimeDatePart(v)}</span>
      </div>
    );
  };

  renderInfo = item => {
    return (
      <div className={styles.liitem}>
        <Icon
          type="message"
          className={styles.fa}
          style={{
            backgroundColor: getRandomColor(item.informationChangeLogId),
          }}
        />
        <div className={styles.timelineexitem}>
          <span className={styles.time}>
            <Icon
              type="clock-circle-o"
              className={styles.fa}
              style={{
                marginLeft: '20px',
                position: 'inherit',
                width: '12px',
                height: '12px',
                lineHeight: '12px',
                fontSize: '12px',
                marginRight: '2px',
              }}
            />
            {this.getCreateTimeTimePart(item.createTime)}
          </span>
          <h3 className={styles.timelineexheader}>
            <a href="#">{item.agencyUserName}</a> ({item.agencyUserLoginName})
          </h3>
          <div
            className={styles.timelineexbody}
            style={{
              fontSize: '13px',
            }}
          >
            {item.operationRemark}
          </div>
          <div className={styles.timelineexfooter}>
            <span
              style={{
                fontSize: '13px',
              }}
            >
              所属组织：{item.agencyName}
            </span>
            <span
              style={{
                marginLeft: '20px',
                fontSize: '13px',
              }}
            >
              登陆Ip:{item.ip}
            </span>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const {
      data: { list, pagination },
    } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    return (
      <div className={styles.timelineexbox}>
        <div className={`${styles.timelineex} ${styles.timelineexinverse}`}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={paginationProps}
            dataSource={list}
            renderItem={item => (
              <List.Item
                key={item.title}
                style={{
                  paddingTop: '0px',
                  paddingBottom: '0px',
                  borderBottom: '0px',
                }}
              >
                <div>
                  {this.renderDateLabel(item.createTime)}
                  {this.renderInfo(item)}
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default TimeLineCustom;
