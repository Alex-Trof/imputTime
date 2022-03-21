import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import TimeChooser from './TimeChooser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton, Colors } from 'react-native-paper';
import TotalTime from './TotalTime';
import {toFormatDate} from './TimeHelper';

class Home extends Component {
  state = {
    hoursNames: {MatinDépart: this.today() + ' MatinDépart',
    MatinArrivée: this.today() + ' MatinArrivée',
    AprèsMidiDépart: this.today() + ' AprèsMidiDépart',
    AprèsMidiArrivée: this.today() + ' AprèsMidiArrivée'},
    isAllTimeOk: false
  };

  today() {
    const date = toFormatDate(new Date())
    return date
  }

  async reset() {
    await AsyncStorage.clear()
    console.log("reseting")
  }

  updateIsTimeOk = () => {
    this.setState({isAllTimeOk: true});
  }

  async test() {
    AsyncStorage.getAllKeys()
    .then(x => {
      console.log(x)
    })
    AsyncStorage.getItem("Temps Total 21/3/2022")
    .then(y => {
      console.log(y)
    })
    AsyncStorage.getItem("Temps Total 20/3/2022")
    .then(y => {
      console.log(y)
    })
  }
  
  async calculateTimeTotal() {
    let diffMatin = 0
    let diffAprem = 0
    
    AsyncStorage.getItem(this.today() + ' MatinDépart')
    .then(matinD => {
      AsyncStorage.getItem(this.today() + ' MatinArrivée')
      .then(matinA => {
        diffMatin = (new Date(matinD).getTime() - new Date(matinA).getTime()) / (1000 * 60 * 60)

        AsyncStorage.getItem(this.today() + ' AprèsMidiDépart')
        .then(apremD => {
          AsyncStorage.getItem(this.today() + ' AprèsMidiArrivée')
          .then(apremA => {
            diffAprem = (new Date(apremD).getTime() - new Date(apremA).getTime()) / (1000 * 60 * 60)
            const totalHour = diffAprem + diffMatin - 7.5

            const date = new Date()
            date.setDate(date.getDate()-1)
            const yesterday = toFormatDate(date)
            const dateToday = this.today()

            AsyncStorage.getItem('Temps Total ' + yesterday)
            .then(yesterdayTime => {
              if(yesterdayTime != null) {
                const updateTime = parseFloat(yesterdayTime) + totalHour
                AsyncStorage.setItem('Temps Total ' + dateToday, updateTime.toString())
              }
              else {
                AsyncStorage.setItem('Temps Total ' + dateToday, totalHour.toString())
              }
            })
          })
        })
      })
    }) 
  };

  render() {
    let button;
    if(this.state.isAllTimeOk) {
      button = <IconButton icon="check" onPress={this.calculateTimeTotal.bind(this)}></IconButton>;
    }
    else {
      button = <IconButton icon="check" disabled onPress={this.test.bind(this)}></IconButton>;
    }
    return (
      <View style={styles.container}>
        <Text>Matin</Text>
        <View style={styles.row}>
          <TimeChooser title="Arrivée" updateTimeOkHandler={this.updateIsTimeOk} today={this.today()} keys={this.state.hoursNames} name={this.state.hoursNames.MatinArrivée}/>
          <TimeChooser title="Départ" updateTimeOkHandler={this.updateIsTimeOk} today={this.today()} keys={this.state.hoursNames} name={this.state.hoursNames.MatinDépart}/>
        </View>
        <Text>Après-midi</Text>
        <View style={styles.row}>
          <TimeChooser title="Arrivée" updateTimeOkHandler={this.updateIsTimeOk} today={this.today()} keys={this.state.hoursNames} name={this.state.hoursNames.AprèsMidiArrivée}/>
          <TimeChooser title="Départ" updateTimeOkHandler={this.updateIsTimeOk} today={this.today()} keys={this.state.hoursNames} name={this.state.hoursNames.AprèsMidiDépart}/>
        </View>
        <View style={styles.row}>
          <Button title="Reset" onPress={this.reset.bind(this)}>
          </Button>
          <Button title="Test" onPress={this.test.bind(this)}>
          </Button>
          {button}
          <TotalTime/>
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
