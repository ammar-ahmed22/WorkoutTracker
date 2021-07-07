//Getting diet totals from data
export const getDietTotals = (data, metricsArr, dateString) =>{
    let dietTotals = {
        protein: 0,
        carbs: 0,
        fats: 0
    }

    for (let i = 0; i < metricsArr.length; i++){
        for (let j = 0; j < data[metricsArr[i]].length; j++){
            if (data[metricsArr[i]][j].label === dateString){
                
                dietTotals[metricsArr[i]] += data[metricsArr[i]][j].value
            }
        }
    }

    return dietTotals;
}

//Convert to calories from grams
export const convertToCalories = (grams, type) =>{
    if (type === 'protein' || type === 'carbs'){
        return grams * 4
    }else if (type === 'fats'){
        return grams * 9
    }
}

//Finding max value from database data (list of objects: {value: number, label: string})
export const getMax = (data) =>{
    let max = 0
    for (let i = 0; i < data.length; i++){
        if (data[i].value > max){
            max = data[i].value
        }
    }

    return max
}

//Finding total value from database data (list of objects: {value: number, label:string})
export const getTotal = (data) =>{
    let total = 0;
    
    for (let i = 0; i < data.length; i++){
        total += data[i].value;
    }
    
    

    return total
}