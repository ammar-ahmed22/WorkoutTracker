
const addWeek = (year, month, day, weeks) =>{
    let start = new Date(year, month - 1, day);

    return start.setDate(start.getDate() + (weeks * 7));
}

const randomInteger = (min, max) =>{
    return Math.floor(Math.random() * (max - min)) + min;
}

let bodyData = [];


let plus1week = addWeek(2021, 5, 30, 2)

for (let i = 0; i < 10; i++){
    bodyData.push({
        value: randomInteger(160, 180),
        label: new Date(addWeek(2021, 5, 2, i)).toDateString().substr(4),
    })
}


// console.log(new Date(plus1week).toDateString().substr(4))
// console.log(bodyData)

const bodyWeight = [
    {
        value: 165,
        label: "Jun 30 2021"
    },
    {
        value: 165,
        label: "Jun 30 2021"
    }
]

const value = 165;
const label = "Jun 30 2021";

let isRemoved = false;
const filtered = bodyWeight.filter(item =>{
    
    
    if (item.value === value && item.label === label && !isRemoved){
        isRemoved = true;
        return false;
    }else{
        return true
    }
})


//console.log(filtered)
let testString = "bodyWeightAmmar";
//let regex = /([A-Z])/g;

// let parsed = testString.replace(regex, " $1");

// parsed = parsed.charAt(0).toUpperCase() + parsed.slice(1);

// console.log(parsed)

const parseCamelCase = str =>{
    const regex = /[A-Z]/g

    let parsed = str.replace(regex, " $&");

    return parsed.charAt(0).toUpperCase() + parsed.slice(1);
}

//console.log(parseCamelCase(testString))

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



console.log(`${weekday}, ${month} ${parseDay(day)} ${year}`)

