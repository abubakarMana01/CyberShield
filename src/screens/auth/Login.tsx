import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';

import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {AppButton, TextInput} from '../../components';
import {ROUTES} from '../../navs/routes';
import {COLORS} from '../../constants/colors';
// import {EMAIL_REGEX} from '~utils';
// import useAuthApi from '~hooks/useAuthApi';

const Login = () => {
  const {navigate} = useNavigation();
  const {control, handleSubmit} = useForm();
  // const {authHandler, isLoading} = useAuthApi();

  const onSubmit = (data: any) => {
    console.log(data);
    // authHandler('login', data);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.container}>
        {/* <Image
          source={require('~assets/images/auth/authenticate.png')}
          style={styles.image}
        /> */}

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
          // autoFocus
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
          text="Login"
          // isLoading={isLoading}
          handleClick={handleSubmit(onSubmit)}
          textStyles={styles.buttonText}
          containerStyles={styles.ctaButton}
        />
      </ScrollView>

      {/* <ChangeAuthView variant="Create Account" /> */}
    </View>
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
