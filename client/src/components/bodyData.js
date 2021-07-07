const addWeek = (year, month, day, weeks) =>{
    let start = new Date(year, month - 1, day);

    return start.setDate(start.getDate() + (weeks * 7));
}

const randomInteger = (min, max) =>{
    return Math.floor(Math.random() * (max - min)) + min;
}

const bmiCalc = (height, weight) =>{
    return ((weight / 2.2) / Math.pow(height, 2)).toFixed(1)
}

let bodyData = [];



for (let i = 0; i < 10; i++){
    let randInt = randomInteger(165, 180);
    bodyData.push({
        date: new Date(addWeek(2021, 6, 30, i+1)).toDateString().substr(4),
        value: randInt
    })
}


export default bodyData;