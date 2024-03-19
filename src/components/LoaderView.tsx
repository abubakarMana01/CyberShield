import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';

export default function LoaderView() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
