import React from 'react';


const NotFound = ({type, metric}) =>{
    return (
        <div className="col-10 dashboard-item">
            <h1 className="text-dark">Error 404</h1>
            <h2 className="text-dark">{`${metric} in ${type} not found`}</h2>
        </div>
    )
}

export default NotFound;