import {
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';
import {AppButton, Screen, Text} from '../components';
import {useNavigate} from '../hooks';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useRoute} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToast} from '../utils';
import {ROUTES} from '../navs/routes';
import {Record} from '../types';
import {axiosInstance} from '../libs/axiosInstance';
import {useAuthContext} from '../contexts/AuthProvider';

type Route = {
  params: {
    record: Record;
  };
};

const RecordDetails = () => {
  const navigation = useNavigate();
  const {params} = useRoute() as Route;
  const {user} = useAuthContext();

  if (!params.record) {
    navigation.goBack();
  }

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    showToast('Copied!');
  };

  const handleOpenUrl = async (link: string) => {
    const isLinkSupported = await Linking.canOpenURL(link);
    if (isLinkSupported) {
      await Linking.openURL(link);
    } else {
      showToast('Cannot open this URL', 'error');
    }
  };

  const deleteRecord = async () => {
    try {
      await axiosInstance.delete(
        `/records/${params.record.id}?userId=${user?.id || ''}`,
      );
      showToast('Record deleted successfully');
      navigation.goBack();
    } catch (ex: any) {
      const errorMsg =
        ex?.message === 'Network Error'
          ? ex?.message
          : ex?.response?.data?.error || 'Oops, something went wrong';
      showToast(errorMsg, 'error');
      console.log(ex.response.data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <View style={styles.headerLeft}>
            <FontAwesome6 name="arrow-left-long" size={22} />
            <Text style={styles.backText}>back</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteRecord}>
          <Ionicons name="trash-outline" size={24} color={COLORS.danger} />
        </TouchableOpacity>
      </View>

      <Screen>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styles.topRow}>
            <View style={styles.iconContainer}>
              <AntDesign name="android1" size={42} color={COLORS.white} />
            </View>
            <View>
              <Text style={styles.title}>{params.record.name}</Text>
              <Text style={styles.identifier}>
                {params.record.userIdentifier}
              </Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.detailsHeader}>
              <Text style={{fontSize: 20}}>Details & settings</Text>
            </View>

            <View style={{gap: 24}}>
              {params.record.link && (
                <View style={{flexDirection: 'row'}}>
                  <Text style={{flex: 0.3, fontSize: 16}}>Link</Text>
                  <TouchableOpacity
                    style={{flex: 0.7}}
                    onPress={() => handleOpenUrl(params.record.link || '')}>
                    <Text style={styles.link}>{params.record.link}</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={{flexDirection: 'row'}}>
                <Text style={{flex: 0.3, fontSize: 16}}>Identifier</Text>
                <Text style={{flex: 0.7, fontSize: 16, opacity: 0.4}}>
                  {params.record.userIdentifier}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{flex: 0.3, fontSize: 16}}>Password</Text>
                <Text style={{flex: 0.7, fontSize: 16, opacity: 0.4}}>
                  {params.record.password}
                </Text>
              </View>
            </View>

            <View style={styles.btnsContainer}>
              <AppButton
                handleClick={() => copyToClipboard(params.record.password)}
                text="Copy password"
                containerStyles={{flex: 1}}
                variant="secondary"
              />
              <AppButton
                handleClick={() =>
                  navigation.navigate(ROUTES.UPDATE_RECORD, {variant: 'update'})
                }
                text="Change password"
                containerStyles={{flex: 1}}
              />
            </View>
          </View>
        </ScrollView>
      </Screen>
    </View>
  );
};

export default RecordDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 55,
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  identifier: {
    color: COLORS.greyDark,
    fontSize: 16,
    marginTop: 6,
  },
  link: {
    fontSize: 16,
    color: COLORS.blue,
    textDecorationLine: 'underline',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.black,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: COLORS.grey2,
    marginBottom: 16,
  },
  content: {
    marginTop: 40,
  },
  btnsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 40,
  },
});
