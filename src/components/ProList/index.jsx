import React, { useEffect } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { List, Skeleton, message } from 'antd';
import ProForm from './ProForm';
import styles from './style.less';

const paginationProps = {
  showSizeChanger: true,
  showQuickJumper: true,
  pageSize: 5,
};

const ListContent = ({ content }) => {
  const { createTime } = content;

  return (
    <div className={styles['list-content-wrapper']}>
      <div className={styles['list-content-item']}>
        <span>创建时间</span>
        <p>{moment(createTime).format('YYYY-MM-DD')}</p>
      </div>
    </div>
  );
};

const ProList = ({ dispatch, proList, loading }) => {
  const handleSelect = async (currentPro) => {
    dispatch({
      type: 'project/saveCurrentPro',
      payload: currentPro,
    });
    dispatch({
      type: 'workplace/fetch',
    });
  };

  const handleDelete = async (projectId) => {
    const hide = message.loading('正在删除项目');
    try {
      dispatch({ type: 'project/submit', payload: { projectId } });
      hide();
      message.success('删除成功');
    } catch (error) {
      hide();
      message.error('删除失败请重试');
    }
  };

  useEffect(() => {
    dispatch({ type: 'project/fetch' });
  }, []);

  return (
    <div className={styles.wrapper}>
      <ProForm />
      <List
        size="large"
        itemLayout="horizontal"
        dataSource={proList}
        pagination={paginationProps}
        renderItem={(item) => {
          return (
            <List.Item
              key={item.id}
              actions={[
                <a key="open" onClick={() => handleSelect(item)}>
                  访问
                </a>,
                <a key="delete" onClick={() => handleDelete(item.id)}>
                  删除
                </a>,
              ]}
            >
              <Skeleton avatar active loading={loading}>
                <List.Item.Meta title={item.name} />
                <ListContent content={item} />
              </Skeleton>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  proList: state.project.proList,
  loading: state.loading.effects['project/fetch'],
});

export default connect(mapStateToProps)(ProList);
