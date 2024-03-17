import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';

import {useForm} from 'react-hook-form';
import {AppButton, AuthHeaderLogo, Screen, TextInput} from '../../components';
import {COLORS} from '../../constants/colors';
import {EMAIL_REGEX} from '../../utils';
import ChangeAuthView from '../../components/ChangeAuthView';
import {useNavigate} from '../../hooks';
import {ROUTES} from '../../navs/routes';
// import useAuthApi from '~hooks/useAuthApi';

const Login = () => {
  const {navigate} = useNavigate();
  const {control, handleSubmit} = useForm();
  // const {authHandler, isLoading} = useAuthApi();

  const onSubmit = (data: any) => {
    console.log(data);
    navigate(ROUTES.SECURITY_QUESTION);
    // authHandler('login', data);
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.container}>
        <AuthHeaderLogo />

        <TextInput
          name="email"
          control={control}
          label="Email Address"
          inputMode="email"
          placeholder="johndoe@example.com"
          autoCapitalize="none"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
          autoFocus
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

          {/* <TouchableOpacity onPress={() => navigate(ROUTES.FORGOT_PASSWORD)}>
            <Text style={styles.forgotPassword}>Forgot your Password?</Text>
          </TouchableOpacity> */}
        </View>
        <AppButton
          text="Proceed"
          // isLoading={isLoading}
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
