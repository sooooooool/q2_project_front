import React from 'react';
import { Result, Button } from 'antd';

const NotFoundPage: React.FC = () => {
    return (
        <Result
            status="404"
            title="404 Not Found"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary">Go Back</Button>}
        />
    );
};

export default NotFoundPage;