import AsyncStorage from '@react-native-async-storage/async-storage';

async function calculateTimeTotal(hoursNames) {
    let times = AssignTime(hoursNames).then(x => {
        x.forEach(y => {
            console.log(y)
        });
    })
}

async function AssignTime(hoursNames) {
    let values = await Promise.all(Object.entries(hoursNames).map( async ([key, value]) => {
        const time = await AsyncStorage.getItem(value)
        if(time != null){
            key = value
            value = time
        }
        else{
            key = value
            value = ''
        }
        return [key, value]
    }))
    
    return values
}

export default calculateTimeTotal;