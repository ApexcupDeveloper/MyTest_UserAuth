import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import TextInput from 'react-native-text-input-interactive';
import {COLORS} from '../assets/colors';
import {GLOBAL_STYLES} from '../assets/styles';
import {MainButton} from '../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/actions/auth';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const SigninScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const authed = useSelector(state => state.auth.authed);
  const loading = useSelector(state => state.auth.loading);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (authed) {
      navigation.navigate('AuthNav');
    }
  }, [authed, navigation]);

  const goSignup = () => {
    navigation.navigate('Signup');
  };

  const goLogin = () => {
    login(dispatch, {
      email,
      password,
    })
      .then(res => {
        setEmail('');
        setPassword('');
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: err,
        });
      });
  };

  return (
    <View style={styles.container}>
      <Text style={GLOBAL_STYLES.title}>Login</Text>
      <View style={styles.main}>
        <TextInput
          placeholder="email"
          keyboardType="email-address"
          mainColor={COLORS.primary}
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
          textInputStyle={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          mainColor={COLORS.primary}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
          textInputStyle={styles.textInput}
          enableIcon
          secureTextEntry={!showPassword}
          iconImageSource={require('../assets/imgs/visible-eye.png')}
          onIconPress={() => {
            setShowPassword(prev => !prev);
          }}
        />
        <MainButton
          label={'Login'}
          loading={loading}
          disabled={!email || !password}
          style={styles.button}
          onPress={goLogin}
        />
      </View>
      <View style={styles.signupContainer}>
        <Text style={GLOBAL_STYLES.infoText}>Don't have an account?</Text>
        <Pressable onPress={goSignup}>
          <Text style={styles.textButton}>Create Account</Text>
        </Pressable>
      </View>
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
  main: {
    marginTop: 20,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  textInput: {
    width: '100%',
    marginVertical: 8,
    color: COLORS.primary,
  },
  signupContainer: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  button: {
    marginTop: 40,
  },
});
