import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const LocationSelectPage: React.FC = () => {
    const handleChange = (value: string) => {
        console.log(`Selected location: ${value}`);
    };

    return (
        <div>
            <h1>Select Location</h1>
            <Select defaultValue="london" style={{ width: 200 }} onChange={handleChange}>
                <Option value="london">London</Option>
                <Option value="paris">Paris</Option>
                <Option value="tokyo">Tokyo</Option>
            </Select>
        </div>
    );
};

export default LocationSelectPage;