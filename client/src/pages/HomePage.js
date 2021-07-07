import React from 'react';
import Dashboard from './Dashboard';
import Menu from '../components/Menu';

const HomePage = () =>{
    return (
        <div className="container-fluid dashboard">
            <div className="row p-3">
                <Menu />
                <Dashboard />
            </div>
        </div>
    )
}


export default HomePage;