import React, { useState } from 'react';
import { Button } from 'antd';
import Icon from '@/components/Icon';
import CreateForm from './CreateForm';
import styles from './style.less';

const ProForm = () => {
  const [createFormVisible, setCreateFormVisible] = useState(false);

  return (
    <>
      <div className={styles.actions}>
        <Button
          type="primary"
          shape="round"
          icon={<Icon type="Plus" />}
          onClick={() => setCreateFormVisible(true)}
        >
          申请项目
        </Button>
      </div>
      {createFormVisible && (
        <CreateForm
          modalVisible={createFormVisible}
          onCancel={() => setCreateFormVisible(false)}
        />
      )}
    </>
  );
};

export default ProForm;
