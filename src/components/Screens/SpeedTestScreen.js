import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, PermissionsAndroid} from 'react-native';
import styles from '../../Style.js';
import RNSpeedometer from 'react-native-speedometer';
import RNFetchBlob from "rn-fetch-blob";
import { db } from "../../config/firebaseSDK.js";
import NetInfo from "@react-native-community/netinfo";

class SpeedTestScreen extends Component {
    state = {
        downloadSpeed: 0,
        imageUrl: 'https://wifi-analyzer-final.s3.amazonaws.com/large-image.jpg',
        ssid: null,
        testFinished: false,
    }

    requestPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "WiFiAnalyzer Location Permission",
                    message:
                        "WiFiAnalyzer needs access to your location " +
                        "so it can retrieve your SSID (Network name).",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }

    componentDidMount = () => {
        let networkName = '';
        this.requestPermissions()
            .then((result) => {
                if (result === true) {
                    NetInfo.fetch()
                        .then(state => {
                            networkName = state.details.ssid;
                            this.setState({ ssid: networkName });
                        })
                } else {
                    console.log('Location permission denied');
                }
            });
    }

    addSpeed = (networkSpeed) => {
        let createdAt = new Date().toISOString();
        db.ref('speed_tests/').push({
            created_at: createdAt,
            network_speed: networkSpeed,
            ssid: this.state.ssid,
        })
    }

    measureNetworkSpeed = () => {
        const startTime = new Date().getTime();
        const speeds = [];

        RNFetchBlob.config({
            fileCache: false,
        })
            .fetch('GET', this.state.imageUrl)
            .progress({ interval: 250 }, (received, total) => {
                let currentTime = new Date().getTime();
                let duration = (currentTime - startTime) / 1000;
                let speed = ((received * 8) / (1024 ** 2 * duration));

                speeds.push(speed);
                console.log('received', speed);
                this.setState({ downloadSpeed: speed })
            })
            .then((res) => {
                let status = res.info().status;
                let finalSpeed = (speeds.reduce((total, value) => total + value)) / speeds.length;

                if (status === 200) {
                    this.setState( {downloadSpeed: finalSpeed});
                    this.setState({testFinished: true})
                    this.addSpeed(finalSpeed);

                    console.log("Got good response, cool " + finalSpeed);
                }
            })
            .catch((err, statusCode) => {
                console.log(err);
                console.log(statusCode);
            });
    }

    onPress = () => {
       this.measureNetworkSpeed();
    }

    render() {
        return (
            <View style={styles.container}>
                <RNSpeedometer value={this.state.downloadSpeed} size={200}/>
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