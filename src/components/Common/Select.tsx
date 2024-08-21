import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const SelectComponent: React.FC = () => {
    return (
        <Select defaultValue="option1" style={{ width: 120 }}>
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
            <Option value="option3">Option 3</Option>
        </Select>
    );
};

export default SelectComponent;