import React from 'react';
import { List } from 'antd';

const CourseList: React.FC = () => {
    const data = [
        'Course 1',
        'Course 2',
        'Course 3',
        'Course 4',
        'Course 5',
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

export default CourseList;