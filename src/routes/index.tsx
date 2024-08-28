import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LocationSelectPage from '../pages/LocationSelectPage';
import CourseSelectPage from '../pages/CourseSelectPage';
import CourseCreatePage from '../pages/CourseCreatePage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LocationSelectPage />} />
            <Route path="/course" element={<CourseSelectPage />} />
            <Route path="/course/create" element={<CourseCreatePage />} />
        </Routes>    
    );
};


export default AppRoutes;