import React from 'react';
import { Rate } from 'antd';

interface RatingProps {
    value: number;
    onChange: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({ value, onChange }) => {
    return (
        <Rate value={value} onChange={onChange} />
    );
};

export default Rating;