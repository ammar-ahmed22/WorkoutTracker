import React, {useState, useEffect} from 'react';
import CustomAreaChart from './CustomAreaChart';
import CustomPieChart from './CustomPieChart';
import AddEntry from './AddEntry';

import bodyData from './bodyData';
import * as helper from '../modules/helperFunctions';

const Dashboard = () =>{

    const entryHandleClick = () =>{
        const modal = document.querySelector('.add-entry-wrapper');
        modal.classList.toggle('d-none');
        modal.classList.toggle('d-block');
    }

    
    const [biometrics, setBiometrics] = useState();
    const [workouts, setWorkouts] = useState();
    const [diet, setDiet] = useState();

    
    useEffect(()=>{
        const fetchData = async () =>{
            const biometricsResult = await (await fetch(`/api/v1/metrics/biometrics`)).json();
            const dietResults = await (await fetch('/api/v1/metrics/diet')).json();
            const workoutsResults = await (await fetch('/api/v1/metrics/workouts')).json();
            //const parsedResult = await result.json();

            console.log(biometricsResult);
            setBiometrics(biometricsResult.data);
            setDiet(dietResults.data);
            setWorkouts(workoutsResults.data);
        }

        fetchData()
    }, [])

    
    
   
    //Displaying date
    const displayDate = () =>{

        const date = new Date();
        const weekday = date.toLocaleString('default', {weekday: "long"});
        const month = date.toLocaleString('default', {month: 'long'});
        const day = date.toLocaleString('default', {day: 'numeric'});
        const year = date.toLocaleString('default', {year: "numeric"});

        const parseDay = (day) =>{
            let lastdig = parseInt(day[day.length-1])
        
            if (lastdig !== 1 || lastdig !== 2 || lastdig !== 3){
                return day+"th"
            }else{
                if (lastdig == 1){
                    return day+'st'
                }else if (lastdig == 2){
                    return day+'nd'
                }else if (lastdig == 3){
                    return day+"rd"
                }
            }
        }

        return `${weekday}, ${month} ${parseDay(day)} ${year}`

    }
    
    

    //Getting total calories today from protein, carbs and fats
    const displayCalories = () =>{

        const today = new Date().toDateString().substr(4)

        let dietTotals = {}
        let calories = 0;
        if (diet){
            let dietTotals = helper.getDietTotals(diet, ['protein', 'carbs', 'fats'], today)
            for (let prop in dietTotals){
                calories += helper.convertToCalories(dietTotals[prop], prop)
            }
        }
        
        return calories
    }


    return (
        <>

        

                
                
                {/* Main Dashboard Content */}
                <div className="col-10 main overflow-visible">


                    {/* Header Content */}
                    <div className="row px-5 my-3 ">
                        <div className="col-6 p-0">
                            <h1 className="text-dark p-0">Hello, <strong>Ammar</strong></h1>
                            <p className="text-dark">It's a great day for a workout!</p>
                        </div>

                        <div className="col-6 p-0 text-end">
                            <h2 className="text-dark text-end">{displayDate()}</h2>
                            <button className="btn btn-dark rounded" onClick={entryHandleClick}><i class='bx bx-plus'></i> New Entry</button>
                        </div>
                    </div>

                    
                    {/* Dasboard Items */}

                    {/* Row 1 */}
                    <div className="row px-3 ">

                        {/* Calories */}
                        <div className="col-3 dashboard-item px-5 py-4 d-flex align-items-center">
                            <div className="row">
                                <div className="col-2 d-flex justify-content-center align-items-center ">
                                    <p className="text-dark fs-1 dashboard-icon m-0 p-3">
                                        <i class='bx bxs-flame'></i>
                                    </p>
                                </div>

                                <div className="col-8 mx-3 d-flex justify-content-center flex-column">
                                    <p className="fw-bold text-dark m-0 fs-4">{displayCalories()}</p>
                                    <p className="fw-lighter m-0 fs-5">Calories today</p>
                                </div>
                            </div>
                        </div>


                        {/* Bench */}
                        <div className="col-3 px-5 dashboard-item py-4 d-flex align-items-center">
                            <div className="row">
                                <div className="col-2 d-flex justify-content-center align-items-center ">
                                    <p className="text-dark fs-1 dashboard-icon m-0 p-3">
                                        <i class='bx bx-dumbbell'></i>
                                    </p>
                                </div>

                                <div className="col-8 mx-3 d-flex justify-content-center flex-column">
                                    <p className="fw-bold text-dark m-0 fs-4">{workouts ? helper.getMax(workouts.benchPress) : 0} lbs.</p>
                                    <p className="fw-lighter m-0 fs-5">Bench press max.</p>
                                </div>
                            </div>
                        </div>


                        {/* Cycling */}
                        <div className="col-3 px-5 dashboard-item py-4 d-flex align-items-center">
                            <div className="row">
                                <div className="col-2 d-flex justify-content-center align-items-center ">
                                    <p className="text-dark fs-1 dashboard-icon m-0 p-3">
                                        <i class='bx bx-cycling'></i>
                                    </p>
                                </div>

                                <div className="col-8 mx-3 d-flex justify-content-center flex-column">
                                    <p className="fw-bold text-dark m-0 fs-4">{workouts ? helper.getTotal(workouts.bike) : 0}km</p>
                                    <p className="fw-lighter m-0 fs-5">Bike distance all time</p>
                                </div>
                            </div>
                        </div>


                        {/* Running */}
                        <div className="col-3 px-5 dashboard-item py-4 d-flex align-items-center">
                            <div className="row">
                                <div className="col-2 d-flex justify-content-center align-items-center ">
                                    <p className="text-dark fs-1 dashboard-icon m-0 p-3">
                                        <i class='bx bx-run'></i>
                                    </p>
                                </div>

                                <div className="col-8 mx-3 d-flex justify-content-center flex-column">
                                    <p className="fw-bold text-dark m-0 fs-4">{workouts ? helper.getTotal(workouts.run) : 0}km</p>
                                    <p className="fw-lighter m-0 fs-5">Run distance all time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                    {/* Row 2 */}
                    <div className="row px-3">
                        <div className="col-9 dashboard-item dashboard-chart ">
                            <h3 className="text-dark my-3 mx-5">Body Weight</h3>
                            <div className="chart d-flex justify-content-center mt-4">
                            <CustomAreaChart data={biometrics}  metric="bodyWeight" />
                            </div>
                            
                        </div>

                        <div className="col-3">
                            <div className="row dashboard-item dashboard-sm-chart">
                                <h6 className="text-dark mt-3 mb-0 mx-2">Diet Breakdown</h6>
                                <p className="text-muted fw-light mx-2 mb-0 small-text">By Calories</p>
                                <div className="pie-chart  pb-5">
                                    <CustomPieChart data={diet} metric={["protein", 'carbs', 'fats']} type="diet-breakdown"/>
                                </div>
                            </div>

                            <div className="row dashboard-item dashboard-sm-chart">

                            </div>
                        </div>
                    </div>
                </div>

          
        
        <AddEntry entryHandleClick={entryHandleClick} setBiometrics={setBiometrics} setWorkouts={setWorkouts} setDiet={setDiet}></AddEntry>
        </>
    )

}


export default Dashboard;