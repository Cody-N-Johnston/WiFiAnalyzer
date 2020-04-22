import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import styles from '../../Style.js';
import RNSpeedometer from 'react-native-speedometer';
import RNFetchBlob from "rn-fetch-blob";

class SpeedTestScreen extends Component {
    state = {
        value: 0,
        progress: 0,
        downloadSpeed: 0,
        imageUrl: 'https://wifi-analyzer-final.s3.amazonaws.com/test-image.jpg',
    }

    onChange = (value) => this.setState({value: parseInt(value)});

    onPress = () => {
        const startTime = new Date().getTime();
        const speeds = [];

        RNFetchBlob.config({
            fileCache: false,
        })
            .fetch('GET', this.state.imageUrl)
            .progress({ interval: 250 }, (received, total) => {
                let progress = (received/total) * 100;
                let currentTime = new Date().getTime();
                let duration = (currentTime - startTime) / 1000;
                let speed = ((received * 8) / (1024 ** 2 * duration));

                speeds.push(speed);
                console.log('received', speed);
                this.setState({ value: speed })
            })
            .then((res) => {
              let status = res.info().status;
              let endTime = new Date().getTime();
              let finalSpeed = (speeds.reduce((total, value) => total + value)) / speeds.length;

              if (status === 200) {
                  console.log("Got good response, cool " + finalSpeed);
              }
            })
            .catch((err, statusCode) => {
                console.log(err);
                console.log(statusCode);
            });
    }

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