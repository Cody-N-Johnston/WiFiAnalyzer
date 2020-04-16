import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import styles from '../../Style.js';

class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.lightText2}>Home</Text>
            </View>
        )
    }
}

export default HomeScreen;