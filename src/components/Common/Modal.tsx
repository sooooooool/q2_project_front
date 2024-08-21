import React from 'react';
import { Modal, Button } from 'antd';

const ExampleModal: React.FC = () => {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title="Example Modal"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Modal content goes here.</p>
            </Modal>
        </div>
    );
};

export default ExampleModal;