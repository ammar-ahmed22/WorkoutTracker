import React, {useState, useEffect} from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Text
} from 'recharts';

import bodyData from './bodyData';

const CustomAreaChart = ({data, metric}) =>{

    const xtickFormatter = (tickItem, index) =>{
        if (((index) % 2) === 0){
            
            return tickItem
        }else{
            return " "
        }
    }

    const ytickFormatter = (tickItem, index) =>{
        if (index == 0){
            return " "
        }else{
            return tickItem
        }
    }
    

    
    if (data){
        return (
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart
                    width={500}
                    height={400}
                    data={data[metric]}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid  vertical={false}/>
                    <XAxis dataKey="label" tickLine={false} tickFormatter={xtickFormatter}/>
                    <YAxis 
                        type="number"
                        domain={[145, 190]}
                        tickFormatter={ytickFormatter}
                    />
                    <Tooltip />
                    
                    <Legend/>
                    <Area type="monotone" dataKey="value" stroke="#000000" fill="#000000" name="body weight (lbs)"/>
                </AreaChart>
          </ResponsiveContainer>
        )
    }else{
        return (
            <h1>loading</h1>
        )
    }

    
    
}


export default CustomAreaChart;
