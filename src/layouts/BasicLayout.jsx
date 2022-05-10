import React from 'react';
import { Link } from 'umi';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import styles from './BasicLayout.less';

const { Header } = Layout;

const BasicLayout = ({ children }) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <Link to="/">
            <div className={styles.logo}>光网络故障告警仿真系统</div>
          </Link>
        </Header>
        <Layout className={styles.main}>{children}</Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default BasicLayout;
