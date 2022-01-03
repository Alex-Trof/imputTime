import AsyncStorage from '@react-native-async-storage/async-storage';

async function calculateTimeTotal() {
    const keys = await AsyncStorage.getAllKeys();
    console.log(this)
    console.log(keys);
}

export default calculateTimeTotal;