import React from 'react';

const Chart = ({type, metric, chartType, defaultTimeLine}) =>{

    return (
        <div className="col-10 dashboard-item">
            <h1 className="text-dark">Workout Page</h1>
            <h2 className="text-dark">{`${metric} in ${type}`}</h2>
            <h2 className="text-dark">{`chart type: ${chartType}`}</h2>
            <h2 className="text-dark">{`default timeline: ${defaultTimeLine}`}</h2>
        </div>
    )

}

export default Chart;
