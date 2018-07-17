import React from 'react';
import { Link } from 'dva/router';
import { Spin } from 'antd';
import PageHeader from '../components/PageHeader';
import styles from './PageHeaderLayout.less';

export default ({ children, wrapperClassName, top, ...restProps }) => {
  const { loading } = { ...restProps };
  return (
    <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
      {top}
      <Spin spinning={loading || false}>
        <PageHeader key="pageheader" {...restProps} linkElement={Link} />
      </Spin>
      {children ? <div className={styles.content}>{children}</div> : null}
    </div>
  );
};
