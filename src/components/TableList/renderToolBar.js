import React from 'react';
import { Row, Divider, Tooltip, Button, Space } from 'antd';
import styles from './style.less';

const renderToolBar = (actions, extraActions) => {
  return (
    <Row align="middle" justify="end" style={{ marginBottom: 12 }}>
      <Space>
        {actions &&
          actions.length > 0 &&
          actions.map((action) => {
            const { value, type = 'default', icon, bindEvent, render } = action;
            const actionBtn = (
              <Button key={value} type={type} onClick={bindEvent}>
                {icon} {value}
              </Button>
            );
            return render ? render(actionBtn) : actionBtn;
          })}
      </Space>
      <Divider type="vertical" />
      <Space>
        {extraActions &&
          extraActions.length > 0 &&
          extraActions.map((action) => {
            const { value, icon, bindEvent } = action;
            return (
              <Tooltip key={value} title={value}>
                <span className={styles.icon} onClick={bindEvent}>
                  {icon}
                </span>
              </Tooltip>
            );
          })}
      </Space>
    </Row>
  );
};

export default renderToolBar;
