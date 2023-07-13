import {StyleSheet} from 'react-native';
import {COLORS} from './colors';

export const GLOBAL_STYLES = StyleSheet.create({
  title: {
    fontSize: 38,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: COLORS.gray3,
  },
});
