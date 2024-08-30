
import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface SelectComponentProps {
    options: { value: string; label: string }[];
}

const SelectComponent: React.FC<SelectComponentProps> = ({ options }) => {
    return (
        <Select defaultValue={options[0].value} style={{ width: 120 }}>
            {options.map((option) => (
                <Option key={option.value} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
};

export default SelectComponent;