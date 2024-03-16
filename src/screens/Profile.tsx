import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ROUTES} from '../navs/routes';
import {useNavigate} from '../hooks';
import {COLORS} from '../constants/colors';
import {Screen} from '../components';
import {useAppContext} from '../contexts/AppProvider';

const Profile = () => {
  const {logout} = useAppContext();
  const {navigate, goBack} = useNavigate();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={goBack}>
          <FontAwesome6 name="arrow-left-long" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.headerRight}
          onPress={() => navigate(ROUTES.ADD_NEW_RECORD)}>
          <Ionicons name="add" size={28} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <Screen>
        <View style={styles.userImgContainer}>
          <Fontisto name="person" size={48} color={COLORS.white} />
        </View>
        <View>
          <Text style={styles.username}>Faiza Olagunju</Text>
          <Text style={styles.phoneNumber}>902633XXXX</Text>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={styles.editProfileText}>Edit profile</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, marginTop: 20}}>
          <View>
            <TouchableOpacity style={styles.settingRow}>
              <Text style={styles.settingText}>Switch account</Text>
              <MaterialCommunityIcons
                size={34}
                color={COLORS.grey}
                name="chevron-right"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingRow}>
              <Text style={styles.settingText}>Security</Text>
              <MaterialCommunityIcons
                size={34}
                color={COLORS.grey}
                name="chevron-right"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingRow}>
              <Text style={styles.settingText}>Trusted devices</Text>
              <MaterialCommunityIcons
                size={34}
                color={COLORS.grey}
                name="chevron-right"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingRow}>
              <Text style={styles.settingText}>Backup</Text>
              <MaterialCommunityIcons
                size={34}
                color={COLORS.grey}
                name="chevron-right"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <Text style={styles.loginText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    </View>
  );
};

export default Profile;

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
  headerLeft: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '500',
  },
  headerRight: {
    position: 'absolute',
    right: 16,
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
  username: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '500',
  },
  phoneNumber: {
    fontSize: 16,
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 4,
  },
  editProfileBtn: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.grey2,
    paddingVertical: 11,
    paddingHorizontal: 24,
    marginTop: 20,
    alignSelf: 'center',
  },
  editProfileText: {
    color: COLORS.black,
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  settingText: {
    fontSize: 16,
  },

  logoutBtn: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.danger,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 'auto',
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  loginText: {
    color: COLORS.danger,
  },
});
