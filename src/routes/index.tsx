import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LocationSelectPage from '../pages/LocationSelectPage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LocationSelectPage />} />
        </Routes>    
    );
};


export default AppRoutes;