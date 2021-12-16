import React, { Component } from "react";
import { Text, View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

class TimeChooser extends Component {
    state = { date: new Date(1598051730000),
            mode:  'time',
            show: false};

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({show: Platform.OS === 'ios'});
        this.setState({date: currentDate});
        };

    showMode = (currentMode) => {
        this.setState({show: true});
        this.setState({mode: currentMode});
        };
    
    showTimepicker = () => {
        this.showMode('time');
        };

    render() {
      return(
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
                <Text>{this.state.date.getHours().toString()}:{this.state.date.getMinutes().toString()}</Text>
            </View>
        </View>
          );
    }
  }

export default TimeChooser;