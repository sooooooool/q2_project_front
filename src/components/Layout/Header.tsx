import React from 'react';
import { Layout, Menu } from 'antd';

import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import CustomLink from '../Common/Link';

const { Header } = Layout;

interface CustomHeaderProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }


const CustomHeader: React.FC<CustomHeaderProps> = ({ className, style, children }) => (
<Header className={`${className}`} style={{backgroundColor:"transparent",display:"flex",justifyContent:"space-between",alignContent:"center", height:"80px"}}>
    <CustomLink to="/" icon= {<HomeOutlined style={{ fontSize: '24px', marginRight: '16px', color:"black"}} />} tooltip="Go to Location list" />
        {children}
    <CustomLink to="/login" icon= {<UserOutlined style={{ fontSize: '24px', marginLeft: 'auto', color: "black" }} />} tooltip="Go to Login " />
</Header>
);


export default CustomHeader;