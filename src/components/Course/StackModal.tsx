import React from 'react';
import { Modal, List, Button, Pagination, Spin } from 'antd';
import * as T from '../../types';

const StackModal: React.FC<T.StackModalProps> = ({ visible, loading, data, total, currentPage, onPageChange, onCancel, onSelect }) => (
  <Modal
    title="Select a Spot"
    open={visible}
    onCancel={onCancel}
    footer={null}
  >
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