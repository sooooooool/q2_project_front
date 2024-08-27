import React from 'react';
import { Layout, Menu } from 'antd';

import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

interface CustomHeaderProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }


const CustomHeader: React.FC<CustomHeaderProps> = ({ className, style, children }) => (
<Header className={`${className}`} style={{backgroundColor:"transparent",display:"flex",justifyContent:"center",alignContent:"center", height:"80px"}}>
    <HomeOutlined style={{ fontSize: '24px', marginRight: '16px', }} />
        {children}
    <UserOutlined style={{ fontSize: '24px', marginLeft: 'auto' }} />
</Header>
);


export default CustomHeader;