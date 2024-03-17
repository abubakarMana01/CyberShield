import {StyleSheet} from 'react-native';
import React from 'react';

import {AppButton, AuthHeaderLogo, Screen} from '../../components';

const Biometrics = () => {
  return (
    <Screen>
      <AuthHeaderLogo />

      <AppButton
        text="Proceed"
        // isLoading={isLoading}
        handleClick={() => {}}
        containerStyles={styles.ctaButton}
      />
    </Screen>
  );
};

export default Biometrics;

const styles = StyleSheet.create({
  container: {},
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
});
