/* eslint-disable react/no-unstable-nested-components */
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {Screen} from '../components';
import {COLORS} from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ROUTES} from '../navs/routes';
import {useNavigate} from '../hooks';
import CircularProgress from '../components/CircularProgress';
import useRecords from '../hooks/useRecords';
import LoaderView from '../components/LoaderView';
import {Record} from '../types';
import {useAppContext} from '../contexts/AppProvider';
import {useNavigation} from '@react-navigation/native';
import {
  calculatePasswordStrength,
  STRENGTH_LEVEL_MAX,
} from '../utils/passwordStrength';

const Analysis = () => {
  const {records} = useAppContext();
  const {isLoading, refetch} = useRecords();
  const navigation = useNavigation();

  const weakPasswords = [];
  const riskPasswords = [];
  const strongPasswords = [];

  records?.forEach(record => {
    const strengthPercentage = calculatePasswordStrength(record.password);

    if (strengthPercentage < STRENGTH_LEVEL_MAX.risk) {
      riskPasswords.push(record.password);
    } else if (strengthPercentage < STRENGTH_LEVEL_MAX.weak) {
      weakPasswords.push(record.password);
    } else {
      strongPasswords.push(record.password);
    }
  });

  const securityPercentage =
    (strongPasswords.length /
      (strongPasswords.length + weakPasswords.length + riskPasswords.length)) *
    100;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      refetch();
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  if (isLoading && !records) {
    return <LoaderView />;
  }

  return (
    <Screen>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.container}>
            <View style={styles.circularProgressContainer}>
              <View>
                <View style={styles.percentageOverlay}>
                  <Text
                    style={[
                      styles.securityPercentage,
                      {top: -3, fontWeight: '500'},
                    ]}>
                    64%
                  </Text>
                </View>
                <CircularProgress percent={64} />
              </View>
            </View>
            <Text style={styles.securityPercentage}>
              {securityPercentage}% secured
            </Text>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{strongPasswords.length}</Text>
                <Text style={styles.statTitle}>Safe</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{weakPasswords.length}</Text>
                <Text style={styles.statTitle}>Weak</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{riskPasswords.length}</Text>
                <Text style={styles.statTitle}>Risk</Text>
              </View>
            </View>

            <View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Analysis</Text>
                <Ionicons name="filter" size={28} color={COLORS.grey} />
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={() => <View style={styles.itemSeparator} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        data={records}
        renderItem={({item}) => <Analytic item={item} />}
      />
    </Screen>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  container: {},
  securityPercentage: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    marginBottom: 28,
    marginTop: 32,
  },
  stat: {
    borderColor: COLORS.grey2,
    borderWidth: 1,
    borderRadius: 14,
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 12,
    maxWidth: 95,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  statTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  itemSeparator: {
    height: 20,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '500',
  },
  rowTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  rowIdentifier: {
    color: COLORS.greyDark,
    marginTop: 4,
    fontSize: 16,
  },
  progressOuter: {
    height: 5,
    borderRadius: 20,
    backgroundColor: COLORS.grey3,
    overflow: 'hidden',
    flex: 1,
  },
  progressInner: {
    height: '100%',
  },

  percentageOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularProgressContainer: {
    alignSelf: 'center',
  },
});

const Analytic = ({item}: {item: Record}) => {
  const {navigate} = useNavigate();
  const percentage = calculatePasswordStrength(item.password);

  const getStatus = (): 'Risk' | 'Weak' | 'Safe' => {
    if (percentage < STRENGTH_LEVEL_MAX.risk) {
      return 'Risk';
    } else if (percentage < STRENGTH_LEVEL_MAX.weak) {
      return 'Weak';
    } else {
      return 'Safe';
    }
  };
  const status = getStatus();

  return (
    <TouchableOpacity
      onPress={() => navigate(ROUTES.RECORD_DETAILS, {record: item})}>
      <View style={styles.row}>
        <View style={styles.rowImg}>
          <AntDesign name="android1" size={26} color={COLORS.white} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <View style={{flex: 1, gap: 4}}>
            <Text style={styles.rowTitle}>{item.name}</Text>
            <Text style={styles.rowIdentifier}>{item.userIdentifier}</Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={34}
            color={COLORS.grey}
          />
        </View>
      </View>

      <View style={[styles.row, {marginTop: 5}]}>
        <Text style={{width: 60, textAlign: 'center'}}>{status}</Text>
        <View style={styles.progressOuter}>
          <View
            style={[
              styles.progressInner,
              {
                backgroundColor:
                  status === 'Risk'
                    ? COLORS.danger
                    : status === 'Weak'
                    ? COLORS.warning
                    : COLORS.success,
                width: `${percentage}%`,
              },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
