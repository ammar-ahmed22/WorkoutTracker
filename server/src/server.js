const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

require('dotenv').config();
const PORT = process.env.PORT || 8000;
const DATABASE_URI = process.env.DATABASE_URI;

const app = express();

app.use(bodyParser.json())

console.log(`PORT: ${PORT}`)

//Testing server
app.get('/hello', (req, res)=>{

    res.status(200).json({message: "Hello world from workout tracker!"})
})

//Database connection
const withDB = async (operations, res) =>{


    try{
        const client = await MongoClient.connect(DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true});

        const db = client.db('workout-tracker');

        await operations(db);

        client.close()
    }catch (err){
        res.status(500).json({"message": `Error connecting to DB ${err}`})
    }
}



//Getting a type of metric
app.get('/api/v1/metrics/:type', (req, res)=>{
    const {type} = req.params;

    withDB( async (db)=>{
        const data = await db.collection('metrics').findOne({name: type});

        res.status(200).json({
            message: `Sucessfully got all ${type} data`,
            data
        })
    }, res)

})

//Getting a metric from a metric type
app.get('/api/v1/metrics/:type/:metric', (req, res)=>{
    const {type, metric} = req.params;

    
    withDB(async(db)=>{

        const metricType = await db.collection('metrics').findOne({name: type});

        const data = metricType[`${metric}`];

        
        res.status(200).json({metric, data})

    }, res)
    
    
})

//TODO: Adding data and new metrics 
app.post('/api/v1/metrics/:type/:operation/', (req, res)=>{
    const {type, operation} = req.params;
    const metricTypes = ["workouts", "biometrics", "diet"];

    const testWorkoutMetric = {name: "workouts", benchPress: [], bike: [], run: []};
    
    //TODO: Adding a new metric to database
    if (operation === 'add-metric'){
        const {metric, data} = req.body;
        if (metricTypes.indexOf(type) !== -1){
            res.status(200).json({
                message: `Metric type, ${type} found`,
                metric,
                data
            })
        }else{
            res.status(404).json({
                error: `Metric type, ${type} NOT found`
            })
        }
    //Adding data to a metric in database
    }else if (operation === 'add-data'){
        const {metric} = req.query;
        const {value, label} = req.body;

        withDB( async (db)=>{

            const metrics = await db.collection('metrics').findOne({name: type});

            if (metrics.hasOwnProperty(metric)){
                await db.collection('metrics').updateOne({name: type}, {
                    '$set': {
                        
                        [metric] : metrics[`${metric}`].concat({value, label})
                    }
                })

                const updatedMetrics = await db.collection('metrics').findOne({name: type});

                res.status(200).json({
                    message: `Data added to ${metric} in ${type}`,
                    data: updatedMetrics
                })
            }
        }, res)
    
    }else if (operation === 'add-array-data'){
        //Adding array of data
        const {metric} = req.query;
        const {data} = req.body;

        withDB( async(db)=>{

            const metrics = await db.collection('metrics').findOne({name: type});

            if (metrics.hasOwnProperty(metric)){
                await db.collection('metrics').updateOne({name: type}, {
                    '$set': {
                        [metric]: metrics[`${metric}`].concat(data)
                    }
                })

                const updatedMetrics = await db.collection('metrics').findOne({name: type});

                res.status(200).json({
                    message: `Array data added to ${metric} in ${type}`,
                    data: updatedMetrics
                })
            }
        }, res)
    }else if (operation == 'remove-metric'){
        //TODO: Removing metric from database
    }else if (operation == 'remove-data'){
        const {metric} = req.query;
        const {value, label} = req.body;

        withDB( async (db)=>{
            const metrics = await db.collection('metrics').findOne({name: type});
            let isRemoved = false;
            if (metrics.hasOwnProperty(metric)){

                await db.collection('metrics').updateOne({name: type}, {
                    '$set': {
                        [metric]: metrics[`${metric}`].filter((item) =>{
                        
                            if (item.value === value && item.label === label && !isRemoved){
                                isRemoved = true;
                                return false;
                            }else{
                                return true;
                            }
                        })
                    }
                })

                const updatedMetrics = await db.collection('metrics').findOne({name: type});
                
                res.status(200).json({
                    message: `Data removed from ${metric} in ${type}`,
                    data: updatedMetrics
                })
            }
        }, res)
    }else if (operation == 'remove-all-data'){
        //Might be temporary endpoint, need for testing
        const {metric} = req.query;
        withDB(async (db)=>{
            const metrics = await db.collection('metrics').findOne({name: type});

            if (metrics.hasOwnProperty(metric)){
                
                await db.collection('metrics').updateOne({name: type}, {
                    '$set': {
                        [metric]: []
                    }
                })

                const updatedMetrics = await db.collection('metrics').findOne({name: type});

                res.status(200).json({
                    message: `All data removed from ${metric} in ${type}`,
                    data: updatedMetrics
                })
            }
        }, res)
        
    }

})

//TODO: Get units
app.get('/api/v1/units', (req, res)=>{

    withDB( async (db) =>{

        const units = await db.collection('metrics').findOne({name: "units"});

        res.status(200).json({
            message: "Sucessfully got all units data",
            data: units
        })

    }, res)

})


app.listen(process.env.PORT, ()=>console.log(`App listening on port ${process.env.PORT}`))