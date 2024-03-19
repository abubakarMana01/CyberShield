import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import {useForm} from 'react-hook-form';
import {
  AppButton,
  AuthHeaderLogo,
  Screen,
  Text,
  TextInput,
} from '../../components';
import PhoneInput from '../../components/PhoneInput';
import {Country, countryData} from '../../utils/country';
import {COLORS} from '../../constants/colors';
import ChangeAuthView from '../../components/ChangeAuthView';
import useAuthApi from '../../hooks/useAuthApi';

const Register = () => {
  const countryCode = 'NG';
  const {control, handleSubmit} = useForm();
  const {authHandler, isLoading} = useAuthApi();
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countryData[0],
  );

  const onSubmit = (data: any) => {
    const formData = {...data, phone: selectedCountry.dialCode + data.phone};
    console.log(formData);
    authHandler('register', formData);
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.container}>
        <AuthHeaderLogo />

        <TextInput
          name="fullName"
          control={control}
          label="Full Name"
          placeholder="John Doe"
          autoCapitalize="words"
          rules={{required: 'Full name is required'}}
          autoFocus
        />
        <PhoneInput
          name="phoneNumber"
          control={control}
          label="Phone Number"
          inputMode="tel"
          countryCode={countryCode}
          placeholder=" 8044783751"
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
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
        <TextInput
          name="securityAnswer"
          control={control}
          label="Answer to security question"
          placeholder="********"
          secureTextEntry
          rules={{
            required: 'Answer to security question is required',
          }}
        />

        <View style={styles.agreementTextContainer}>
          <Text style={styles.agreementText}>
            By continuing, you accept out
          </Text>
          <TouchableOpacity>
            <Text style={styles.agreementTextSecondary}>
              {' Terms of Use '}
            </Text>
          </TouchableOpacity>
          <Text style={styles.agreementText}>and</Text>
          <TouchableOpacity>
            <Text style={styles.agreementTextSecondary}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        <AppButton
          text="Continue"
          handleClick={handleSubmit(onSubmit)}
          isLoading={isLoading}
        />
      </ScrollView>
      <ChangeAuthView variant="login" />
    </Screen>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  agreementTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  agreementText: {
    lineHeight: 21,
  },
  agreementTextSecondary: {
    color: COLORS.primary,
  },
});
