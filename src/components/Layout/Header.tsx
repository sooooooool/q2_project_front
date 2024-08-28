import React from 'react';
import { Layout, Menu } from 'antd';

import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;

interface CustomHeaderProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }


const CustomHeader: React.FC<CustomHeaderProps> = ({ className, style, children }) => (
<Header className={`${className}`} style={{backgroundColor:"transparent",display:"flex",justifyContent:"space-between",alignContent:"center", height:"80px"}}>
    <Link to="/">
        <HomeOutlined style={{ fontSize: '24px', marginRight: '16px', color:"black"}} />
    </Link>
        {children}
    <Link to="/login">
    <UserOutlined style={{ fontSize: '24px', marginLeft: 'auto', color: "black" }} />
    </Link>
</Header>
);


export default CustomHeader;