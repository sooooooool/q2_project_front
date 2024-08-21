import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout, { Content } from 'antd/es/layout/layout';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Content>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
};

const Home: React.FC = () => {
    return <h1>Home Page</h1>;
};

const About: React.FC = () => {
    return <h1>About Page</h1>;
};

const Contact: React.FC = () => {
    return <h1>Contact Page</h1>;
};

export default AppRoutes;