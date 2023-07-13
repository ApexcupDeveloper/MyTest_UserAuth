import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SigninScreen} from '../screens/signin';
import {SignupScreen} from '../screens/signup';
import {AuthNavigator} from './auth_navigation';
import {SplashScreen} from '../screens/splash';
const {Navigator, Screen} = createStackNavigator();

export const RootNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="Splash" component={SplashScreen} />
    <Screen name="Signin" component={SigninScreen} />
    <Screen name="Signup" component={SignupScreen} />
    <Screen name="AuthNav" component={AuthNavigator} />
  </Navigator>
);
