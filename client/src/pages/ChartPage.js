import React, {useEffect, useState} from 'react';
import Menu from '../components/Menu';
import Chart from '../components/Chart';
import NotFound from '../components/NotFound';

import { convertToCamelCase } from '../modules/helperFunctions';

const ChartPage = ({match}) =>{
    const {type, metric} = match.params;

    const [doesExist, setDoesExist] = useState();


    useEffect(()=>{
        const fetchData = async () =>{
            const result = await (await fetch(`/api/v1/metrics/${type}`)).json();

            console.log(result)

                //TODO: Fix endpoint so that it sends an error message on invalid type
                if (result.data){
                    if (Object.keys(result.data).includes(convertToCamelCase(metric))){
                        setDoesExist(true)
                    }else{
                        setDoesExist(false)
                    }

           
                }else{
                    setDoesExist(false)
                }
            
                

                //setDoesExist(false)
        
        }

        fetchData()
    }, [type, metric])
    
    console.log(doesExist)
    if (doesExist){
        return (
            <div className="container-fluid">
                <div className="row p-3">
                    <Menu />
                    <Chart type={type} metric={convertToCamelCase(metric)} chartType="line" defaultTimeLine="week"/>
                </div>
            </div>
        )
    }else{
        return (
            <div className="container-fluid">
                <div className="row p-3">
                    <Menu />
                    <NotFound type={type} metric={convertToCamelCase(metric)}/>
                </div>
            </div>
        )
    }
    
}


export default ChartPage;