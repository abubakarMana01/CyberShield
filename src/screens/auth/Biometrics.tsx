import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TouchID from 'react-native-touch-id';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {AppButton, AuthHeaderLogo, Screen, Text} from '../../components';
import {COLORS} from '../../constants/colors';
import {useAppContext} from '../../contexts/AppProvider';

const Biometrics = () => {
  const {setUser} = useAppContext();

  const authenticate = () => {
    TouchID.authenticate('to demo this react-native component')
      .then((success: any) => {
        console.log('Success', success);
      })
      .catch((error: any) => {
        Alert.alert(
          'Failed',
          'Ensure device has biometrics authentication set up.',
        );
        console.log(error);
      });
  };

  return (
    <Screen>
      <AuthHeaderLogo />

      <View style={styles.container}>
        <Text style={styles.authText}>Touch to authenticate</Text>
        <TouchableOpacity onPress={authenticate}>
          <MaterialCommunityIcons
            name="fingerprint"
            size={60}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>

      <AppButton
        text="Proceed"
        // isLoading={isLoading}
        handleClick={() => setUser({})}
        containerStyles={styles.ctaButton}
      />
    </Screen>
  );
};

export default Biometrics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    objectFit: 'contain',
    alignSelf: 'center',
  },
  ctaButton: {
    marginTop: 'auto',
    marginBottom: 16,
  },
  authText: {
    textAlign: 'center',
    marginTop: -100,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
  },
});
