import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Component } from 'react/cjs/react.production.min';
import {toFormatDate} from './TimeHelper';
import { Text, View } from 'react-native';

class TotalTime extends Component {

    state = {
        totalTime: 0,
    }

    componentDidUpdate(){
        this.updateTime()
    }

    componentDidMount() {
        this.updateTime()
    }

    today() {
        const date = toFormatDate(new Date())
        return date
      }

    updateTime() {
        AsyncStorage.getItem('Temps Total ' + this.today())
        .then(x => {
        if(x != null) {
            this.setState({totalTime: x})
        }
        else {
            const date = new Date()
            date.setDate(date.getDate()-1)
            const yesterday = toFormatDate(date)
            AsyncStorage.getItem('Temps Total ' + date)
            .then(y => {
                this.setState({totalTime: y})
            })
        }
        })
    }

    render() {
        return(
            <View>
                <Text>
                    {this.state.totalTime}
                </Text>
            </View> 
        )
    }
}

export default TotalTime;
