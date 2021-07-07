import React from 'react';


const AddEntry = ({entryHandleClick, setBiometrics, setWorkouts, setDiet}) =>{

    const bmiCalc = (height, weight) =>{
        return ((weight / 2.2) / Math.pow(height, 2)).toFixed(1)
    }

    //TODO: Update this when figured out how to do all data not only biometric
    const addData = async (metricType, metric, value, label) =>{
        const result = await fetch(`/api/v1/metrics/${metricType}/add-data/?metric=${metric}`, {
            method: 'post',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({value, label})
        })

        const parsedResult = await result.json();

       
        //TODO: Currently only for biometric
        if (metricType === 'biometrics'){
            setBiometrics(parsedResult.data)
        }else if (metricType === 'workouts'){
            setWorkouts(parsedResult.data)
        }else if (metricType === 'diet'){
            setDiet(parsedResult.data)
        }
        
    }

    const handleSubmit = (e) =>{
        const value = document.querySelector('.entry-value');
        const label = document.querySelector('.entry-label');
        const metricType = document.getElementById('metricTypeSelector');
        const metric = document.getElementById('metricSelector');


        let labelDate = new Date(label.valueAsNumber);
        labelDate.setDate(labelDate.getDate() + 1)
        const stringDate = labelDate.toDateString().substr(4);

        console.log(`Value: ${value.value}\nLabel: ${stringDate}\nMetric Type: ${metricType.value}\nMetric: ${metric.value}`);

        if ((metricType.value !== "default") && (metric.value !== 'default') && (value.value) && (label.value)){
            console.log('Added')
            addData(metricType.value, metric.value, parseInt(value.value), stringDate);
        }
        
        
        
        if ((metricType.value !== "default") && (metric.value !== 'default') && (value.value) && (label.value)){
            //Success indication
            e.target.classList.toggle('btn-dark');
            e.target.classList.toggle('btn-success');
            e.target.textContent = 'Success!'

            //After 1 second, reset and close modal
            setTimeout(()=>{
                e.target.classList.toggle('btn-dark');
                e.target.classList.toggle('btn-success');
                e.target.textContent = 'Add';
                entryHandleClick()
            }, 1000, e)
        }else{
            //Invalid input indication
            e.target.classList.toggle('btn-dark');
            e.target.classList.toggle('btn-danger');
            e.target.textContent = 'Invalid Input'

            //After 1 second, reset
            setTimeout(()=>{
                e.target.classList.toggle('btn-dark');
                e.target.classList.toggle('btn-danger');
                e.target.textContent = 'Add';
            }, 1000, e)
        }

        //Resetting inputs
        value.value = "";
        label.value= '';
        metricType.value = "default";
        metric.value = "default";
        
    }

    const parseCamelCase = str =>{
        const regex = /[A-Z]/g
    
        let parsed = str.replace(regex, " $&");
    
        return parsed.charAt(0).toUpperCase() + parsed.slice(1);
    }

    

    const handleMetricTypeChange = async () =>{
        const metricTypeSelect = document.getElementById('metricTypeSelector');
        const metricSelect = document.getElementById('metricSelector');
        let metricType = metricTypeSelect.value;

        const result = await fetch(`/api/v1/metrics/${metricType}`);
        const parsedResult = await result.json();
        
            
        let metrics = Object.keys(parsedResult.data)

        metrics = metrics.filter(item =>{
            if (item === "_id" || item === "name"){
                return false
            }else{
                return true
            }
        })

        let metricSelectInnerHTML = '<option value="default" selected disabled>Select a metric</option>';

        metrics.forEach(item=>{
            metricSelectInnerHTML += `<option value="${item}">${parseCamelCase(item)}</option>\n`
        })

        metricSelect.innerHTML = metricSelectInnerHTML;
    }

    const handleMetricChange = async (e) =>{
        const type = document.getElementById('metricTypeSelector').value;
        const metric = e.target.value;

        const result = await fetch('/api/v1/units');
        const parsedResult = await result.json();

        
        const units = parsedResult.data.units;

        let unit;

        for (let i = 0; i < units.length; i++){
            if (units[i].type === type){
                for (let j = 0; j < units[i].metrics.length; j++){
                    if (units[i].metrics[j].metric === metric){
                        unit = units[i].metrics[j].unit;
                    }
                }
            }
        }

        const valInput = document.getElementById('valueInput');

        if ((e.target.value !== 'default') && unit){
            valInput.placeholder = `Enter value in ${unit}`
        }else{
            valInput.placeholder = 'Select metric'
        }
        

        console.log(unit)

    }


    

    

    //displayMetrics('biometrics')

    return (
        <div className="add-entry-wrapper d-none">
            <div className="add-entry-modal p-5">
            
                <button className="modal-close text-dark btn fs-3" onClick={entryHandleClick}><i class='bx bx-x' ></i></button>
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-dark my-3">Add Entry</h3>
                    </div>
                </div>
               
                <div className="row">
                    <div className="col-6">
                        <p className="text-muted m-0 text-nowrap select-label">Metric Type</p>
                        <div className="select-cont">
                            <select name="metricTypes" id="metricTypeSelector" onChange={handleMetricTypeChange} className="selector">
                                <option value="default" selected disabled>Select metric type</option>
                                <option value="workouts">Workouts</option>
                                <option value="biometrics">Biometrics</option>
                                <option value="diet">Diet</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-6">
                        <p className="text-muted m-0 select-label">Metric</p>
                        <div className="select-cont">
                            <select name="metrics" id="metricSelector" className="selector" onChange={handleMetricChange}>
                                <option value="default" selected disabled>Select metric</option>
                            </select>
                        </div>
                        
                    </div>
                </div>

                <p className="text-muted text-nowrap select-label m-0 mt-2">Value</p>
                <input type="text" className="entry-value entry-input my-2" placeholder="Select metric" id="valueInput"></input>

                <p className="text-muted text-nowrap select-label m-0 mt-2">Date</p>
                <input type="date" className="entry-label entry-input my-2" placeholder="Enter date"></input>

                <button className="btn btn-dark rounded my-3 submit-btn" onClick={handleSubmit}>Add</button>
            </div>
        </div>
        
    )
}




export default AddEntry;