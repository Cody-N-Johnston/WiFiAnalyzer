import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList} from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import styles from "../Style";

class SpeedTest extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={speedStyles.container}>
                <MaterialCommunityIcons name="wifi" color='#8FBCBB' size={20} />
                <View style={styles.col}>
                    <View style={speedStyles.header}>
                        <View style={styles.row}>
                            <Text style={styles.lightText}>{this.props.ssid}</Text>
                            <Text style={[styles.lightText3, speedStyles.floatRight]}>{new Date(this.props.createdAt).toDateString()}</Text>
                        </View>
                        <View style={[styles.row, speedStyles.netSpeed]}>
                            <MaterialCommunityIcons name="arrow-down" color="#88C0D0" size={15}/>
                            <Text style={[styles.lightText2]}>{this.props.networkSpeed}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.col}>

                </View>
            </View>
        );
    }
}

export default SpeedTest;

const speedStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#2E3440',
        justifyContent: 'space-around'
    },
    netSpeed: {
        alignItems: 'center',
        margin: 5
    },
    floatRight: {
        marginLeft: 100
    }
});