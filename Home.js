import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import TimeChooser from './TimeChooser';

const Home = () => {      
        return (
            <View style={styles.container}>
                <Text>Matin</Text>
                <View style={styles.row}>
                    <TimeChooser title="Set Arrival"/>
                    <TimeChooser title="Set Departure"/>
                </View>

                <Text>Après-midi</Text>
                <View style={styles.row}>
                    <TimeChooser title="Set Arrival"/>
                    <TimeChooser title="Set Departure"/>
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: '7%',
        marginTop: '3%',
        justifyContent: "space-around"
    },
  });

export default Home;