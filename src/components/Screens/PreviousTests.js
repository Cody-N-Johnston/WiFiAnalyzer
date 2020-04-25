import React, { Component } from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import  styles from '../../Style.js';
import { db } from "../../config/firebaseSDK.js";
import  SpeedTest from "../SpeedTest";

class TestHistory extends Component {
    state = {
        tests: [],
    }

    getTestResults = () => {
        db.ref('speed_tests/').on('value', snapshot => {
            let data = snapshot.val();

            if (data) {
                Object.keys(data).forEach((value) => {
                    data[value]["id"] = value;
                })

                this.setState({tests: Object.values(data)});
            }
        })
    }

   renderItem = ({ item }) => (
       <SpeedTest
           networkSpeed={ item.network_speed }
           ssid={ item.ssid }
           createdAt={ item.created_at }
       />
   );

    componentDidMount = () => {
       this.getTestResults();
    }

    render() {
        return (
            <View style={historyStyles.historyContainer}>
                <View style={[styles.row]}>
                   <Text style={[styles.lightText3, historyStyles.header]}>Results</Text>
                   <View style={styles.spacer} />
                   <Text style={[styles.lightText4, historyStyles.header]}>Mbps</Text>
                </View>
                <FlatList
                    style={historyStyles.list}
                    data={this.state.tests}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}

export default TestHistory;

const historyStyles = StyleSheet.create({
    list: {
      margin: 20,
  },
    historyContainer: {
      backgroundColor: '#3B4252',
      flex: 1,
  },
    header: {
      justifyContent:'space-between'
  }
});