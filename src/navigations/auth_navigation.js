import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home';
const {Navigator, Screen} = createStackNavigator();

export const AuthNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="Home" component={HomeScreen} />
  </Navigator>
);
