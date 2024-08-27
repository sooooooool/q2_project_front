import React from "react";
import { Layout } from "antd";
import AppRoutes from "../../routes";
import Header from "./Header";
import Footer from "./Footer";

const CustomLayout: React.FC = () => (
    <Layout style={{position:"relative", minHeight:"100vh", backgroundColor:"white" }}>
        <Header style={{position:"fixed", zIndex:1, width: '100%'}}/>
        <Layout.Content style={{position:"relative"}}>
            <AppRoutes />
        </Layout.Content>
        <Footer style={{position:"fixed", zIndex:1, width: '100%', bottom: 0, textAlign:'center'}}/>
    </Layout>
);

export default CustomLayout;