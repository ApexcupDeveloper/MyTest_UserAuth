import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {COLORS} from '../assets/colors';
import {GLOBAL_STYLES} from '../assets/styles';
import {useDispatch, useSelector} from 'react-redux';
import {SET_DATA_LOADING, SET_LOADING} from '../redux/types';

export const SplashScreen = ({navigation}) => {
  const [current, setCurrent] = useState(2);
  const dispatch = useDispatch();
  const timerRef = useRef(current);
  const authed = useSelector(state => state.auth.authed);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setCurrent(prev => prev - 1);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
    dispatch({
      type: SET_DATA_LOADING,
      payload: false,
    });
    if (current === 0) {
      if (authed) {
        navigation.navigate('AuthNav');
      } else {
        navigation.navigate('Signin');
      }
    }
  }, [current, authed, navigation, dispatch]);

  return (
    <View style={styles.container}>
      <Text style={GLOBAL_STYLES.title}>User Auth</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
});
