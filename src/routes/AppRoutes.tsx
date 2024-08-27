import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocationSelectPage from '../pages/LocationSelectPage';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LocationSelectPage />} />
            </Routes>    
        </Router>
    );
};


export default AppRoutes;