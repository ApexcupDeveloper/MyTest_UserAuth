import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import TextInput from 'react-native-text-input-interactive';
import {COLORS} from '../assets/colors';
import {GLOBAL_STYLES} from '../assets/styles';
import {MainButton} from '../components/button';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {validateEmail} from '../utils/validateEmail';
import {register} from '../redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';

export const SignupScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const authed = useSelector(state => state.auth.authed);
  const loading = useSelector(state => state.auth.loading);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (authed) {
      navigation.navigate('AuthNav');
    }
  }, [authed, navigation]);

  const goLogin = () => {
    navigation.navigate('Signin');
  };

  const goSignup = () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please type your email!',
      });
      return;
    }
    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Invalid email!',
      });
      return;
    }
    if (!username) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please type your username!',
      });
      return;
    }
    if (!password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please type your password!',
      });
      return;
    }

    register(dispatch, {
      email,
      username,
      password,
    })
      .then(res => {
        setEmail('');
        setUsername('');
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
      <Text style={GLOBAL_STYLES.title}>Sign up</Text>
      <View style={styles.main}>
        <TextInput
          placeholder="Username"
          mainColor={COLORS.primary}
          value={username}
          onChangeText={text => {
            setUsername(text);
          }}
          textInputStyle={styles.textInput}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          mainColor={COLORS.primary}
          onChangeText={text => {
            setEmail(text);
          }}
          textInputStyle={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          value={password}
          mainColor={COLORS.primary}
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
          label={'Create Account'}
          loading={loading}
          disabled={!email || !username || !password}
          onPress={goSignup}
          style={styles.button}
        />
      </View>
      <View style={styles.signupContainer}>
        <Text style={GLOBAL_STYLES.infoText}>Already have an account?</Text>
        <Pressable onPress={goLogin}>
          <Text style={styles.textButton}>Log in</Text>
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
