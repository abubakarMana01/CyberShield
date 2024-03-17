import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AuthHeaderLogo = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} />
      <Text style={styles.title}>CyberShield</Text>
      <Text style={styles.subtitle}>Redefining Security</Text>
    </View>
  );
};

export default AuthHeaderLogo;

const styles = StyleSheet.create({
  container: {alignSelf: 'center', alignItems: 'center', marginBottom: 8},
  title: {fontSize: 30, fontWeight: '700', marginTop: 4},
  subtitle: {fontSize: 16, marginTop: 2},
});
