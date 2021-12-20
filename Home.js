import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TimeChooser from './TimeChooser';

const Home = () => {    
        return (
            <View style={styles.container}>
                <Text>Matin</Text>
                <View style={styles.row}>
                    <TimeChooser title="Arrivée" name="MatinArrivée"/>
                    <TimeChooser title="Départ" name="MatinDépart"/>
                </View>

                <Text>Après-midi</Text>
                <View style={styles.row}>
                    <TimeChooser title="Arrivée" name="AprèsMidiArrivée"/>
                    <TimeChooser title="Départ" name="AprèsMidiDépart"/>
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