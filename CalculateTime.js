import AsyncStorage from '@react-native-async-storage/async-storage';

async function isAllTimes(hoursNames) {
    let isTimes = true;
    let turn = 1;
    return new Promise((resolve, reject) => {
        Object.entries(hoursNames).map(([key, value]) => {
            AsyncStorage.getItem(value)
            .then(y => {
                if(y == null || y == new Date(0)){
                    isTimes = false
                    resolve(isTimes)
                }
                else if(turn == 4 && isTimes == true) {
                    
                    resolve(isTimes)
                }
                turn += 1
            })
        })
    })
}

function toFormatDate(date){
    console.log("date month: " + date.getMonth()+1)
    return date.getDate() + '/' + date.getMonth()+1 + '/' + date.getFullYear()
}

export {
    isAllTimes,
    toFormatDate,
}