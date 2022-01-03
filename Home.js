import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import TimeChooser from './TimeChooser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from '@expo/vector-icons';
import { Component } from 'react/cjs/react.production.min';
import calculateTime from './CalculateTime';

class Home extends Component {
  state = {
    hoursNames: {MatinDépart: this.today() + ' MatinDépart',
    MatinArrivée: this.today() + ' MatinArrivée',
    AprèsMidiDépart: this.today() + ' AprèsMidiDépart',
    AprèsMidiArrivée: this.today() + ' AprèsMidiArrivée'}
  };

  today() {
    return new Date().getDate() + '/' + new Date().getMonth()+1 + '/' + new Date().getFullYear()
  }

  async calculateTotal() {
    Object.keys(this.state.hoursNames).forEach(async (x) => {
      const time = await AsyncStorage.getItem(x);
      console.log(time);
    });
  }

  async reset() {
    await AsyncStorage.clear()
    console.log("reseting")
  }

  handlePress() {
    console.log("heheh")
  }

  render() {
    let res = true;
    Object.keys(this.state.hoursNames).forEach(async (x) => {
      const time = await AsyncStorage.getItem(x);
      if(time == null){
        res = false;
      }
      //console.log("new res: " + res);
    });

    return (
      <View style={styles.container}>
        <Text>Matin</Text>
        <TouchableOpacity style={styles.row} onPress={() => {console.log("hthththt")}}>
          <View style={styles.row}>
            <TimeChooser title="Arrivée" name={this.state.hoursNames.MatinArrivée}/>
            <TimeChooser title="Départ" name={this.state.hoursNames.MatinDépart}/>
          </View>
        </TouchableOpacity>
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
