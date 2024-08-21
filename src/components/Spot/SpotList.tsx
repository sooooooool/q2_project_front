import React from 'react';
import { List } from 'antd';

const SpotList: React.FC = () => {
    const data = [
        'Spot 1',
        'Spot 2',
        'Spot 3',
        'Spot 4',
        'Spot 5',
    ];

    return (
        <List
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    {item}
                </List.Item>
            )}
        />
    );
};

export default SpotList;