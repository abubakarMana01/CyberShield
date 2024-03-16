import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Screen} from '../components';
import {COLORS} from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigate} from '../hooks';
import {ROUTES} from '../navs/routes';

const Settings = () => {
  const {navigate} = useNavigate();
  const [isSyncEnabled, setIsSyncEnabled] = useState(true);
  const [isAutofillEnabled, setIsAutofillEnabled] = useState(true);

  return (
    <Screen>
      <ScrollView bounces={false}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => navigate(ROUTES.PROFILE)}>
            <Text style={styles.settingText}>Profile</Text>
            <MaterialCommunityIcons
              size={34}
              color={COLORS.grey}
              name="chevron-right"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingText}>Permissions</Text>
            <MaterialCommunityIcons
              size={34}
              color={COLORS.grey}
              name="chevron-right"
            />
          </TouchableOpacity>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Sync</Text>
            <Switch
              value={isSyncEnabled}
              onValueChange={() => setIsSyncEnabled(prev => !prev)}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Autofill</Text>
            <Switch
              value={isAutofillEnabled}
              onValueChange={() => setIsAutofillEnabled(prev => !prev)}
            />
          </View>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingText}>About</Text>
            <MaterialCommunityIcons
              size={34}
              color={COLORS.grey}
              name="chevron-right"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingText}>Help</Text>
            <MaterialCommunityIcons
              size={34}
              color={COLORS.grey}
              name="chevron-right"
            />
          </TouchableOpacity>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Version</Text>
            <Text style={styles.version}>1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    gap: 8,
    flex: 1,
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
  version: {
    fontWeight: '500',
    fontSize: 16,
    right: 10,
    opacity: 0.5,
  },
});
