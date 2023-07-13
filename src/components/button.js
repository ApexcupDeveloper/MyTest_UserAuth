import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../assets/colors';

export const MainButton = ({label, onPress, loading, disabled, style}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor:
            !loading && !disabled ? COLORS.primary : COLORS.disabled,
        },
        style,
      ]}
      onPress={() => {
        if (!loading && !disabled) {
          onPress();
        }
      }}>
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.white} />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '100%',
    height: 46,
    backgroundColor: COLORS.primary,
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
