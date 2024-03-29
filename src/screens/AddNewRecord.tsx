import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import React, {useState} from 'react';
import {useNavigate} from '../hooks';
import {AppButton, PasswordGenerator, Screen, TextInput} from '../components';
import {COLORS} from '../constants/colors';
import {useForm} from 'react-hook-form';
import {showToast} from '../utils';
import {axiosInstance} from '../libs/axiosInstance';
import {useAuthContext} from '../contexts/AuthProvider';

const AddNewRecord = () => {
  // Count used to trigger regeneration of password
  const [regenerateCount, setRegenerateCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const {goBack} = useNavigate();
  const {control, handleSubmit} = useForm();
  const {user} = useAuthContext();

  const onSubmit = async (formData: any) => {
    if (!password.trim()) {
      return showToast('Password is required', 'error');
    }
    const payload = {...formData, password};

    try {
      setIsLoading(true);
      const {data} = await axiosInstance.post(
        `/records/add?userId=${user?.id}`,
        payload,
      );
      console.log(data.data);
      goBack();
    } catch (ex: any) {
      const errorMsg =
        ex?.message === 'Network Error'
          ? ex?.message
          : ex?.response?.data?.error || 'Oops, something went wrong';
      showToast(errorMsg, 'error');
      console.log(ex.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={goBack}>
          <FontAwesome6 name="arrow-left-long" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New record</Text>
      </View>

      <ScrollView>
        <Screen>
          <View style={styles.inputsContainer}>
            <TextInput
              name="name"
              control={control}
              label="Name"
              inputMode="text"
              placeholder="website or app name"
              autoCapitalize="none"
              rules={{
                required: 'Name is required',
              }}
              autoFocus
            />
            <TextInput
              name="userIdentifier"
              control={control}
              label="User ID"
              inputMode="text"
              placeholder="username or email or phone"
              autoCapitalize="none"
              rules={{
                required: 'Identifier is required',
              }}
            />
            <TextInput
              name="link"
              control={control}
              label="Link"
              inputMode="url"
              placeholder="link to website"
              autoCapitalize="none"
              rules={{}}
            />
          </View>
          <View style={styles.passwordHeader}>
            <Text style={styles.passwordText}>Password</Text>
          </View>
          <PasswordGenerator
            {...{password, setPassword, regenerateCount, setRegenerateCount}}
          />
          <View style={styles.btnsContainer}>
            <AppButton
              handleClick={() => setRegenerateCount(prev => prev + 1)}
              text="Regenerate"
              containerStyles={styles.btn}
              variant="secondary"
            />
            <AppButton
              handleClick={handleSubmit(onSubmit)}
              text="Save password"
              containerStyles={styles.btn}
              isLoading={isLoading}
            />
          </View>
        </Screen>
      </ScrollView>
    </View>
  );
};

export default AddNewRecord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },
  inputsContainer: {
    gap: 16,
  },
  passwordHeader: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: COLORS.grey2,
    marginTop: 24,
  },
  passwordText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 8,
  },
  headerLeft: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '500',
  },
  btnsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 40,
  },
  btn: {
    flex: 1,
  },
});
