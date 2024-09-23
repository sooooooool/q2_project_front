import React from 'react';
import { Modal, List, Button, Pagination, Spin, Alert } from 'antd';
import * as T from '../../types';

const StackModal: React.FC<T.StackModalProps> = ({
  visible,
  loading,
  data,
  total,
  currentPage,
  onPageChange,
  onCancel,
  onSelect,
  error,
}) => (
  <Modal
    title="스팟 선택"
    open={visible}
    onCancel={onCancel}
    footer={null}
  >
    {error && <Alert message="데이터 로드 실패" type="error" showIcon />}
    {loading ? (
      <Spin />
    ) : (
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Button block onClick={() => onSelect(item)}>
              {item.Spot_Name}
            </Button>
          </List.Item>
        )}
      />
    )}
    <Pagination
      current={currentPage}
      total={total}
      pageSize={10}
      onChange={onPageChange}
      style={{ textAlign: 'center', marginTop: '16px' }}
    />
  </Modal>
);

export default StackModal;