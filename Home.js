import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import TimeChooser from './TimeChooser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from '@expo/vector-icons';
import { Component } from 'react/cjs/react.production.min';

class Home extends Component {
  state = {
    hoursNames: {MatinDépart: 'MatinDépart',
    MatinArrivée: 'MatinArrivée',
    AprèsMidiDépart: 'AprèsMidiDépart',
    AprèsMidiArrivée: 'AprèsMidiArrivée'}
  };

  async calculateTotal() {
    Object.keys(this.state.hoursNames).forEach(async (x) => {
      const time = await AsyncStorage.getItem(x);
      console.log(time);
    });
  }

  async reset() {
    Object.keys(this.state.hoursNames).forEach(async (x) => {
      const time = await AsyncStorage.removeItem(x);
    });
    console.log("reseting")
  }

  render() {
    let res = true;
    Object.keys(this.state.hoursNames).forEach(async (x) => {
      const time = await AsyncStorage.getItem(x);
      if(time == null){
        res = false;
      }
      console.log("new res: " + res);
    });

    return (
      <View style={styles.container}>
        <Text>Matin</Text>
        <View style={styles.row}>
          <TimeChooser title="Arrivée" name={this.state.hoursNames.MatinArrivée}/>
          <TimeChooser title="Départ" name={this.state.hoursNames.MatinDépart}/>
        </View>
        <Text>Après-midi</Text>
        <View style={styles.row}>
          <TimeChooser title="Arrivée" name={this.state.hoursNames.AprèsMidiArrivée}/>
          <TimeChooser title="Départ" name={this.state.hoursNames.AprèsMidiDépart}/>
        </View>
        {/* <View style={styles.row}>
          <Button title="Calculate Time" onPress={this.calculateTotal} disabled={res}>
            <Ionicons name="md-checkmark-circle" size={32} color="green" />
          </Button>
        </View> */}
        <View style={styles.row}>
          <Button title="Reset" onPress={this.reset.bind(this)}>
            <Ionicons name="md-checkmark-circle" size={32} color="green" />
          </Button>
        </View>
      </View>
    );
  };

  
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
