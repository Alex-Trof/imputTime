import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import TimeChooser from './TimeChooser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from '@expo/vector-icons';

const Home = () => {
  const [timeTotal, upTimeTotal] = useState('');
  const [timeMA, upTimeMA] = useState('');
  const [isTime, upIsTime] = useState(true);
  const [hoursNames, upHoursNames] = useState({MatinDépart: 'MatinDépart',
  MatinArrivée: 'MatinArrivée',
  AprèsMidiDépart: 'AprèsMidiDépart',
  AprèsMidiArrivée: 'AprèsMidiArrivée'});

  function calculateTotal() {
    Object.keys(hoursNames).forEach(async (x) => {
      const time = await AsyncStorage.getItem(x);
      console.log(time);
    });
  }

  function reset() {
    Object.keys(hoursNames).forEach(async (x) => {
      const time = await AsyncStorage.removeItem(x);
    });
  }

  async function isTimeTotal() {
    let res = true;
    Object.keys(hoursNames).forEach(async (x) => {
      const time = await AsyncStorage.getItem(x);
      if(time == null){
        res = false;
      }
      console.log(time, isTime);
    });
    upIsTime(res);
    console.log("res " + isTime);
    return isTime;
  }

  return (
    <View style={styles.container}>
      <Text>Matin</Text>
      <View style={styles.row}>
        <TimeChooser title="Arrivée" name={hoursNames.MatinArrivée}/>
        <TimeChooser title="Départ" name={hoursNames.MatinDépart}/>
      </View>
      <Text>Après-midi</Text>
      <View style={styles.row}>
        <TimeChooser title="Arrivée" name={hoursNames.AprèsMidiArrivée}/>
        <TimeChooser title="Départ" name={hoursNames.AprèsMidiDépart}/>
      </View>
      <View style={styles.row}>
        <Button title="Calculate Time" onPress={calculateTotal} disabled={isTimeTotal() ? true : false}>
          <Ionicons name="md-checkmark-circle" size={32} color="green" />
        </Button>
      </View>
      <View style={styles.row}>
        <Button title="Reset" onPress={reset}>
          <Ionicons name="md-checkmark-circle" size={32} color="green" />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: '7%',
    marginTop: '3%',
    justifyContent: 'space-around',
  },
});
export default Home;
