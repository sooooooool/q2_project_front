import React from 'react';
import { Form, Input, Button } from 'antd';

const CourseForm: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Form values:', values);
    };

    return (
        <Form onFinish={onFinish}>
            <Form.Item label="Course Name" name="courseName" rules={[{ required: true, message: 'Please enter a course name' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Instructor" name="instructor" rules={[{ required: true, message: 'Please enter an instructor' }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
};

export default CourseForm;