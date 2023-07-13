import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  RefreshControl,
} from 'react-native';
import {COLORS} from '../assets/colors';
import {getUsers} from '../redux/actions/data';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {getAvatar} from '../utils/getAvatar';
import {LOG_OUT} from '../redux/types';

export const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.data.users);
  const loading = useSelector(state => state.data.loading);
  const token = useSelector(state => state.auth.token);
  const authed = useSelector(state => state.auth.authed);

  useEffect(() => {
    if (!authed) {
      navigation.navigate('Signin');
    }
  }, [authed, navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUsers(dispatch, token)
        .then(res => {})
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: err,
          });
        });
    });

    return unsubscribe;
  }, [navigation, token, dispatch]);

  const onRefresh = () => {
    getUsers(dispatch, token)
      .then(res => {})
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: err,
        });
      });
  };

  const goLogout = () => {
    dispatch({
      type: LOG_OUT,
      payload: null,
    });
  };

  const renderItem = ({item}) => {
    if (item) {
      return (
        <View style={styles.item}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{getAvatar(item?.username)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.username}>{item?.username}</Text>
            <Text style={styles.email}>{item?.email}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Users</Text>
        <Pressable onPress={goLogout}>
          <Text style={styles.logout}>Logout</Text>
        </Pressable>
      </View>
      <View style={styles.main}>
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false}
          data={users}
          renderItem={renderItem}
          keyExtractor={(_, i) => i.toString()}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 86,
    alignItems: 'flex-end',
    paddingBottom: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: COLORS.white,
  },
  username: {
    fontSize: 18,
    color: COLORS.primary,
  },
  email: {
    fontSize: 16,
    color: COLORS.gray3,
  },
  avatar: {
    fontSize: 30,
    color: COLORS.white,
  },
  avatarContainer: {
    backgroundColor: COLORS.gray1,
    width: 60,
    height: 60,
    borderRadius: 30,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray4,
  },
  column: {
    marginLeft: 10,
  },
  main: {
    width: '90%',
    paddingVertical: 20,
  },
  logout: {
    fontSize: 16,
    color: COLORS.white,
  },
});
