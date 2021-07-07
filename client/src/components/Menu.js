import React from 'react';




const Menu = () =>{

    return (
            <div className="col-2 menu d-flex flex-column justify-content-between align-items-center">

                    <div className="row placeholder-disp my-5">

                    </div>

                    <div className="row">
                        
                        <div className="col-12  d-flex justify-content-center p-0">
                            <div className="col-10 active  px-3 d-flex align-items-center justify-content-start">
                                <p className="fs-4 text-dark text-center  my-2"><i class='bx bx-home' ></i></p>
                                <p className="fs-5 text-dark text-center my-2 mx-2">Home</p>
                            </div>
                            
                        </div>

                        <div className="col-12 d-flex justify-content-center p-0">
                            <div className="col-10   px-3 d-flex align-items-center justify-content-start">
                                <p className="fs-4 text-light text-center  my-2"><i class='bx bx-dumbbell' ></i></p>
                                <p className="fs-5 text-light text-center my-2 mx-2">Workouts</p>
                            </div>
                            {/* <p className="fs-4 text-transp text-center my-2">Exercise</p> */}
                        </div>

                        <div className="col-12 d-flex justify-content-center p-0">
                            <div className="col-10   px-3 d-flex align-items-center justify-content-start">
                                <p className="fs-4 text-light text-center  my-2"><i class='bx bx-dish' ></i></p>
                                <p className="fs-5 text-light text-center my-2 mx-2">Diet</p>
                            </div>
                            {/* <p className="fs-4 text-transp text-center my-2">Food</p> */}
                        </div>
                    </div>

                    <div className="row my-4">
                        <div className="col-10   px-3 d-flex align-items-center justify-content-start">
                                <p className="fs-4 text-light text-center  my-2"><i class='bx bx-log-out' ></i></p>
                                <p className="fs-5 text-light text-center my-2 mx-2 text-nowrap">Sign-out</p>
                        </div>
                    </div>   
            </div>
    )
}


export default Menu;