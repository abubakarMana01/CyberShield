import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import {useForm} from 'react-hook-form';
import {AppButton, AuthHeaderLogo, Screen, TextInput} from '../../components';
import {COLORS} from '../../constants/colors';
import ChangeAuthView from '../../components/ChangeAuthView';
import useAuthApi from '../../hooks/useAuthApi';
import PhoneInput from '../../components/PhoneInput';
import {Country, countryData} from '../../utils/country';

const Login = () => {
  const countryCode = 'NG';

  const {control, handleSubmit} = useForm();
  const {authHandler, isLoading} = useAuthApi();
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countryData[0],
  );

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      phoneNumber: selectedCountry.dialCode.split('+')[1] + data.phoneNumber,
    };
    authHandler('login', payload);
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.container}>
        <AuthHeaderLogo />

        <PhoneInput
          name="phoneNumber"
          control={control}
          label="Phone Number"
          inputMode="tel"
          countryCode={countryCode}
          placeholder=" 8011111111"
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          autoFocus
          rules={{
            required: 'Phone number is required',
            minLength: {
              value: 8,
              message: 'Phone number should be at least 8 characters',
            },
            maxLength: {
              value: 11,
              message: 'Phone number should not be more than 11 characters',
            },
          }}
        />
        <View>
          <TextInput
            name="password"
            control={control}
            label="Password"
            placeholder="********"
            secureTextEntry
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should be at least 8 characters long',
              },
            }}
          />
        </View>
        <AppButton
          text="Proceed"
          isLoading={isLoading}
          handleClick={handleSubmit(onSubmit)}
          textStyles={styles.buttonText}
          containerStyles={styles.ctaButton}
        />
      </ScrollView>

      <ChangeAuthView variant="register" />
    </Screen>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  image: {
    width: 200,
    height: 200,
    objectFit: 'contain',
    alignSelf: 'center',
  },
  buttonText: {},
  forgotPassword: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 12,
  },
  ctaButton: {
    marginTop: 32,
  },
});
