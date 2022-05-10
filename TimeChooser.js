import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isAllTimes, toFormatDate} from './TimeHelper';

class TimeChooser extends Component {
  state = {date: new Date(0),
    mode: 'time',
    show: false,
    timeFromStorage: new Date(this.getTime()),
  };

  componentDidUpdate() { 
    this.getTime()
    .then(x => {
      this.setState({timeFromStorage: new Date(x)})
    })
  }

  componentDidMount() {
    this.getTime()
    .then(x => {
      this.setState({timeFromStorage: new Date(x)})
    })
  }

  async updateTime() {
    this.getTime()
    .then(x => {
      this.setState({timeFromStorage: new Date(x)})
    })
  }

  async getTime() {
    return await AsyncStorage.getItem(this.props.name)
  }

  saveTime = async (time) => {
    try {
      await AsyncStorage.setItem(this.props.name, time.toString());
      const value = await AsyncStorage.getItem(this.props.name);
      if (value != null) {
        this.setState({timeFromStorage: new Date(value)});
      }
    } catch (e) {
      console.log('erreur saveTime ' + e);
    }
  };

  onChange = (_event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({show: Platform.OS === 'ios'});
    this.setState({date: currentDate});
    this.saveTime(this.state.date);
    isAllTimes(this.props.keys)
    .then(x => {
      if(x == true) {
        this.props.updateTimeOkHandler()
        //this.calculateTimeTotal()
      }
    })
  };

  async calculateTimeTotal() {
    let diffMatin = 0
    let diffAprem = 0
    
    AsyncStorage.getItem(this.props.today + ' MatinDépart')
    .then(matinD => {
      AsyncStorage.getItem(this.props.today + ' MatinArrivée')
      .then(matinA => {
        diffMatin = (new Date(matinD).getTime() - new Date(matinA).getTime()) / (1000 * 60 * 60)

        AsyncStorage.getItem(this.props.today + ' AprèsMidiDépart')
        .then(apremD => {
          AsyncStorage.getItem(this.props.today + ' AprèsMidiArrivée')
          .then(apremA => {
            diffAprem = (new Date(apremD).getTime() - new Date(apremA).getTime()) / (1000 * 60 * 60)
            const totalHour = diffAprem + diffMatin - 7.5

            if(totalHour != 0){
              const date = new Date()
              date.setDate(date.getDate()-1)
              const yesterday = toFormatDate(date)

              AsyncStorage.getItem('Temps Total ' + yesterday)
              .then(yesterdayTime => {
                if(yesterdayTime != null) {
                  const updateTime = parseFloat(yesterdayTime) + totalHour
                  AsyncStorage.setItem('Temps Total ' + this.props.today, updateTime.toString())
                }
                else {
                  AsyncStorage.setItem('Temps Total ' + this.props.today, totalHour.toString())
                }
              })
            }
          })
        })
      })
    })  
  };

  showMode = (currentMode) => {
    this.setState({show: true});
    this.setState({mode: currentMode});
  };

  showTimepicker = () => {
    this.showMode('time');
  };
  
  render() {
    return (
        <View>
          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              mode={this.state.mode}
              onChange={this.onChange}
              is24Hour={true}
              display="default"/>
          )}
          <View>
            <Button onPress={this.showTimepicker} title={this.props.title} />
            <Text style={styles.hour}>
            {this.state.timeFromStorage.getHours() < 10 ? 0 : ""}
            {this.state.timeFromStorage.getHours().toString()}
            :{this.state.timeFromStorage.getMinutes() < 10 ? 0 : ""}
            {this.state.timeFromStorage.getMinutes().toString()}
            </Text>
          </View>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  hour: {
    textAlign: 'center',
  }
})

export default TimeChooser;
