import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import TimeChooser from './TimeChooser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from '@expo/vector-icons';
import { Component } from 'react/cjs/react.production.min';

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

  async reset() {
    await AsyncStorage.clear()
    console.log("reseting")
  }

  render() {
    let res = true;
    Object.keys(this.state.hoursNames).forEach(async (x) => {
      const time = await AsyncStorage.getItem(x);
      if(time == null){
        res = false;
      }
    });

    return (
      <View style={styles.container}>
        <Text>Matin</Text>
        <View style={styles.row}>
          <TimeChooser title="Arrivée" today={this.today()} keys={this.state.hoursNames} name={this.state.hoursNames.MatinArrivée}/>
          <TimeChooser title="Départ" today={this.today()} keys={this.state.hoursNames} name={this.state.hoursNames.MatinDépart}/>
        </View>
        <Text>Après-midi</Text>
        <View style={styles.row}>
          <TimeChooser title="Arrivée" today={this.today()} keys={this.state.hoursNames} name={this.state.hoursNames.AprèsMidiArrivée}/>
          <TimeChooser title="Départ" today={this.today()} keys={this.state.hoursNames} name={this.state.hoursNames.AprèsMidiDépart}/>
        </View>
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
