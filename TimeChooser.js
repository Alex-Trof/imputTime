import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import calculateTime from './CalculateTime';

class TimeChooser extends Component {
  state = {date: new Date(0),
    mode: 'time',
    show: false,
    timeFromStorage: new Date(this.getTime()),
  };

  async getTime() {
    return await AsyncStorage.getItem(this.props.name)
  }

  shouldComponentUpdate(nProps, nState) {
    //console.log(nState != this.state ? true : false);
    return nState != this.state ? true : false
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
    const currentDate = selectedDate || date;
    this.setState({show: Platform.OS === 'ios'});
    this.setState({date: currentDate});
    this.saveTime(this.state.date);
    calculateTime(this.props.keys)
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
            <Text>{this.state.timeFromStorage.getHours().toString()}
            :{this.state.timeFromStorage.getMinutes().toString()}</Text>
          </View>
        </View>
    );
  }
}

export default TimeChooser;
