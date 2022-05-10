import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import { Breadcrumb, Layout, Menu } from 'antd';
import Icon from '@/components/Icon';
import ProList from '@/components/ProList';
import styles from './BasicLayout.less';

const { Content, Sider } = Layout;

const renderMenuList = (routes) => {
  const menuList = routes || [];
  return menuList.map((menu) => {
    return (
      <Menu.Item key={menu.path} icon={<Icon type={menu.icon} />}>
        <Link to={menu.path}>{menu.name}</Link>
      </Menu.Item>
    );
  });
};

const ProLayout = ({ route, children, currentPro, handleReset }) => {
  const { routes = [] } = route;

  return (
    <>
      <Sider
        className={styles.sider}
        collapsible
        trigger={<Icon type="MenuFold" />}
      >
        <Menu mode="inline" selectedKeys={[window.location.pathname]}>
          {renderMenuList(routes)}
        </Menu>
      </Sider>
      <Layout>
        <div className={styles.breadcrumb}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a onClick={handleReset}>项目列表</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{currentPro.name}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Content className={styles.content}>
          {currentPro.id ? children : <ProList />}
        </Content>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentPro: state.project.currentPro,
});

const mapDispatchToProps = (dispatch) => ({
  handleReset: () => {
    dispatch({ type: 'project/resetCurrentPro' });
    dispatch({ type: 'workplace/reset' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProLayout);
