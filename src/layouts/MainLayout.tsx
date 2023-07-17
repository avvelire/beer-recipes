import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout: React.FC = () => {
    return (
        <div className="wrapper">
            <div className="header">
            <   Header />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout