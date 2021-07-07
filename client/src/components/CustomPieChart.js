import React from 'react';
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell
} from 'recharts';

import { convertToCalories, getDietTotals } from '../modules/helperFunctions';




const CustomPieChart = ({data, metric, type}) =>{


    if (type === 'diet-breakdown'){
        const dateString = new Date().toDateString().substr(4)

        let data1 = [];
        let data2 = [];

        

       

        let dietTotals = {};
        if (data){
              
            dietTotals = getDietTotals(data, metric, dateString)

        }
        

        metric.forEach(item =>{
            data1.push({
                value: dietTotals[item],
                label: item
            })

            data2.push({
                value: convertToCalories(dietTotals[item], item),
                label: item
            })
        })

        const COLORS = ['#696969', '#4a4a4a', '#383838']
        const RAD = Math.PI / 180;

        const renderCustomLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) =>{
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

            
            const outx = cx + (radius*2) * Math.cos(-midAngle * RAD);
            const outy = cy + (radius*2) * Math.sin(-midAngle * RAD);

            const inx = cx + radius * Math.cos(-midAngle * RAD);
            const iny = cy + radius * Math.sin(-midAngle * RAD);

            const labelText = ['Protein', 'Carbs', 'Fats'];
            const calories = [convertToCalories(dietTotals.protein), convertToCalories(dietTotals.carbs), convertToCalories(dietTotals.fats)]

            return (
                <>
                <text x={outx > cx ? outx + 10 : outx - 10} y={outy > cy ? outy + 3 : outy - 3} fill="black" textAnchor={outx > cx ? 'start': 'end'} dominantBaseline="central" style={{fontSize: ".6em"}}>
                    {`${labelText[index]}`}
                </text>
                <text x={inx} y={iny} fill="white" textAnchor={inx > cx ? 'start': 'end'} dominantBaseline="central" style={{fontSize: '.8em'}}>
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
                </>
            )
        }
        console.log(data2)
        return (
            <ResponsiveContainer width="100%" height="100%" >
                <PieChart 
                   
                >
                    <Pie data={data2} dataKey="value" cx="50%" cy="50%" labelLine={false} label={renderCustomLabel} fill="#000000" outerRadius={80} >
                    {/* <Pie data={data2} dataKey="value" cx="50%" cy="50%" fill="#777" outerRadius={50} labelLine={false} label={renderCustomLabel}></Pie> */}
                    {
                        data2.map((entry, index)=>(
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))
                    }
                    </Pie>
                </PieChart>
                
            </ResponsiveContainer>
        )
    }
}


export default CustomPieChart;