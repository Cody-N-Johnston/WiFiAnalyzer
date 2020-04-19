import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
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
                <RNSpeedometer value={this.state.value} size={200}/>
                <View style={speedStyles.footer}>
                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.roundButton, speedStyles.button]}
                        onPress={this.onPress}
                    >
                        <Text style={[styles.buttonText, styles.lightText]}>START TEST</Text>
                    </TouchableOpacity>
                </View>
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
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 150,
        borderColor: '#2E3440'
    },
    footer: {
        position: 'absolute',
        bottom: 0
    },
    error: {
        fontSize: 30,
        fontWeight: '700',
        color: '#BF616A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: 30,
        fontWeight: '700',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SpeedTestScreen;