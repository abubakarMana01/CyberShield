import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import {useForm} from 'react-hook-form';
import {AppButton, Screen, Text, TextInput} from '../components';
import {Country, countryData} from '../utils/country';
import PhoneInput from '../components/PhoneInput';
import {useNavigate} from '../hooks';
import {COLORS} from '../constants/colors';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useRoute} from '@react-navigation/native';

type Route = {
  params: {user: {fullName: string; phoneNumber: string}};
};

const EditProfile = () => {
  const countryCode = 'NG';
  const {goBack} = useNavigate();
  const {params} = useRoute() as Route;
  const {control, handleSubmit, setValue} = useForm();
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countryData[0],
  );

  const onSubmit = (data: any) => {
    const formData = {...data, phone: selectedCountry.dialCode + data.phone};
    console.log(formData);
  };

  useEffect(() => {
    setValue('fullName', params?.user?.fullName || '');
    setValue('phone', params?.user?.phoneNumber || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={goBack}>
          <FontAwesome6 name="arrow-left-long" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <Screen>
        <View style={styles.container}>
          <View style={styles.userImgContainer}>
            <Fontisto name="person" size={48} color={COLORS.white} />
          </View>

          <TextInput
            name="fullName"
            control={control}
            label="Full Name"
            placeholder="John Doe"
            autoCapitalize="words"
            rules={{required: 'Full name is required'}}
          />
          <PhoneInput
            name="phone"
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
        </View>

        <AppButton
          text="Submit"
          handleClick={handleSubmit(onSubmit)}
          isLoading={false}
          containerStyles={styles.btnStyles}
        />
      </Screen>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  btnStyles: {
    marginTop: 'auto',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },
  headerLeft: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '500',
  },
  userImgContainer: {
    backgroundColor: COLORS.black,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.greyDark,
    alignSelf: 'center',
  },
});
