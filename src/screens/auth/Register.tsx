import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

import {useForm} from 'react-hook-form';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityQuestionError, setSecurityQuestionError] = useState('');

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      phoneNumber: selectedCountry.dialCode.split('+')[1] + data.phoneNumber,
      securityQuestion,
    };
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

        <View style={styles.dropdownWrapper}>
          <Text style={{marginBottom: 8}}>Select security question</Text>
          <Dropdown
            data={SECURITY_QUESTIONS}
            style={[
              styles.dropdown,
              {
                borderColor: securityQuestion
                  ? COLORS.success
                  : securityQuestionError
                  ? COLORS.danger
                  : COLORS.greyLight,
                backgroundColor: securityQuestion
                  ? COLORS.successLight
                  : securityQuestionError
                  ? COLORS.dangerLight
                  : 'transparent',
              },
            ]}
            placeholder="Select security question"
            placeholderStyle={{fontSize: 14, color: COLORS.grey2}}
            selectedTextStyle={{fontSize: 14}}
            itemTextStyle={{fontSize: 14}}
            maxHeight={300}
            labelField={'label'}
            valueField={'value'}
            value={securityQuestion}
            onChange={item => {
              if (item) {
                setSecurityQuestionError('');
              }
              setSecurityQuestion(item.value);
            }}
            renderLeftIcon={() => (
              <AntDesign
                name="Safety"
                color={COLORS.black}
                size={20}
                style={{marginRight: 8}}
              />
            )}
          />
          {securityQuestionError && (
            <Text style={styles.error}>{securityQuestionError}</Text>
          )}
        </View>

        {securityQuestion && (
          <TextInput
            name="answer"
            control={control}
            label="Answer to security question"
            placeholder="********"
            secureTextEntry
            rules={{
              required: 'Answer to security question is required',
            }}
          />
        )}

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
          handleClick={
            !securityQuestion.trim()
              ? () => {
                  setSecurityQuestionError('Security question is required');
                }
              : handleSubmit(onSubmit)
          }
          isLoading={isLoading}
          containerStyles={styles.ctaBtn}
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
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.greyLight,
    height: Platform.select({ios: 48, android: 53}),
    paddingRight: 16,
    paddingLeft: 12,
    paddingVertical: 6,
  },
  dropdownWrapper: {},
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
  ctaBtn: {
    marginBottom: 20,
  },

  error: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 4,
  },
});

const SECURITY_QUESTIONS = [
  {label: 'Your favorite sports team', value: 'Your favorite sports team'},
  {label: "Mother's maiden name", value: "Mother's maiden name"},
  {
    label: 'Name of primary school attended',
    value: 'Name of primary school attended',
  },
];
