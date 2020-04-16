import * as React from 'react';
import {StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, Foundation } from '@expo/vector-icons';
import HomeScreen from './src/components/Screens/HomeScreen.js';
import SpeedTestScreen from "./src/components/Screens/SpeedTestScreen";

const Tab = createMaterialBottomTabNavigator();

function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
            barStyle={{
                backgroundColor: '#2E3440'
            }}
            activeColor='#8FBCBB'
            inactiveColor='#D8DEE9'
        >
          <Tab.Screen
              name="List"
              component={HomeScreen}
              options={{
                  tabBarLabel: 'List',
                  tabBarIcon: ({ color}) => (
                      <Foundation name="list" color={color} size={25} />
                  )
              }}
          />
          <Tab.Screen
              name="Speed Test"
              component={SpeedTestScreen}
              options={{
                  tabBarLabel: "Speed Test",
                  tabBarIcon: ({ color}) => (
                      <MaterialCommunityIcons name="speedometer" color={color} size={26} />
                  )
              }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App;
