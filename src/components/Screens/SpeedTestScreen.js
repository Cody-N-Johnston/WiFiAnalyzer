import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import styles from '../../Style.js';
import RNSpeedometer from 'react-native-speedometer';

class SpeedTestScreen extends Component {
    state = {
        value: 0,
    }

    onChange = (value) => this.setState({value: parseInt(value)});

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder="Speedometer Value" style={speedStyles.textInput} onChangeText={this.onChange} />
                <RNSpeedometer value={this.state.value} size={200}/>
            </View>
        );
    }
}

const speedStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        borderBottomWidth: 0.3,
        borderBottomColor: 'black',
        height: 25,
        fontSize: 16,
        marginVertical: 50,
        marginHorizontal: 20,
    },
});

export default SpeedTestScreen;