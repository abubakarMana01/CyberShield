import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';

import {useForm} from 'react-hook-form';
import {AppButton, Screen, Text, TextInput} from '../../components';
import {useNavigate} from '../../hooks';
import {useRoute} from '../../hooks/useNavigate';
import useAuthApi from '../../hooks/useAuthApi';

const SecurityQuestion = () => {
  const {params} = useRoute();
  const {goBack} = useNavigate();
  const {control, handleSubmit} = useForm();
  const {authHandler, isLoading} = useAuthApi();

  if (!params?.securityQuestion || !params.phoneNumber) {
    goBack();
  }

  const onSubmit = (data: any) => {
    console.log(data);
    authHandler('validate-security-question', {
      answer: data.answer.trim(),
      phoneNumber: params.phoneNumber,
    });
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.container}>
        <View
          style={{alignSelf: 'center', alignItems: 'center', marginBottom: 8}}>
          <Image source={require('../../assets/logo.png')} />
          <Text style={{fontSize: 30, fontWeight: '700', marginTop: 4}}>
            CyberShield
          </Text>
          <Text style={{fontSize: 16, marginTop: 2}}>Redefining Security</Text>
        </View>

        <View style={{marginTop: 20}}>
          <Text style={styles.securityQuestion}>
            {params?.securityQuestion}
          </Text>
        </View>
        <TextInput
          name="answer"
          control={control}
          label="Answer"
          placeholder="********"
          secureTextEntry
          rules={{
            required: 'Answer is required',
          }}
          autoFocus
        />
        <AppButton
          text="Proceed"
          isLoading={isLoading}
          handleClick={handleSubmit(onSubmit)}
          textStyles={styles.buttonText}
          containerStyles={styles.ctaButton}
        />
      </ScrollView>
    </Screen>
  );
};

export default SecurityQuestion;

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  securityQuestion: {
    fontSize: 18,
    marginTop: 4,
    fontWeight: '500',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    objectFit: 'contain',
    alignSelf: 'center',
  },
  buttonText: {},
  ctaButton: {
    marginTop: 32,
  },
});
