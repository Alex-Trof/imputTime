import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native';

class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Matin</Text>
                <View style={styles.row}>
                    <TextInput style={styles.textInput}/>
                    <TextInput style={styles.textInput}/>
                </View>

                <Text>Après-midi</Text>
                <View style={styles.row}>
                    <TextInput style={styles.textInput}/>
                    <TextInput style={styles.textInput}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        width: '30%',
        borderRadius: 10
    },
    row: {
        flex: 0.04,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: '7%',
        marginTop: '3%'
    },
  });

export default Home;