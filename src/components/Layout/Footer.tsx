import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

interface CustomFooterProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }
  
  const CustomFooter: React.FC<CustomFooterProps> = ({ className, style, children }) => (
    <Footer className={`${className}`} style={style}>
      {children}
    </Footer>
  );

export default CustomFooter;