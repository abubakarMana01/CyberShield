/* eslint-disable react/no-unstable-nested-components */
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Screen} from '../components';
import {COLORS} from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ROUTES} from '../navs/routes';
import {useNavigate} from '../hooks';
import CircularProgress from '../components/CircularProgress';

const Analysis = () => {
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
                    82%
                  </Text>
                </View>
                <CircularProgress percent={40} />
              </View>
            </View>
            <Text style={styles.securityPercentage}>82% secured</Text>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>82</Text>
                <Text style={styles.statTitle}>Safe</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>15</Text>
                <Text style={styles.statTitle}>Weak</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>6</Text>
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
        data={DATA}
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

const Analytic = ({
  item,
}: {
  item: {
    title: string;
    identifier: string;
    password: string;
    link: string;
  };
}) => {
  const {navigate} = useNavigate();
  const percentage = Math.floor(Math.random() * 100);

  const getStatus = (): 'Risk' | 'Weak' | 'Safe' => {
    if (percentage < 30) {
      return 'Risk';
    } else if (percentage < 80) {
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
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={styles.rowIdentifier}>{item.identifier}</Text>
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

const DATA = [
  {
    title: 'Apple',
    identifier: 'faizaolagunju@gmail.com',
    password: 'test1234',
    link: 'apple.com',
  },
  {
    title: 'Adobe',
    identifier: 'faizaolagunju@gmail.com',
    password: 'test1234',
    link: 'adobe.com',
  },
  {
    title: 'Netflix',
    identifier: 'faizaolagunju@gmail.com',
    password: 'test1234',
    link: 'netflix.com',
  },
  {
    title: 'Snapchat',
    identifier: 'snapfaiza@gmail.com',
    password: 'test1234',
    link: 'snapchat.com',
  },
  {
    title: 'Spotify',
    identifier: 'faizaspotify@gmail.com',
    password: 'test1234',
    link: 'spotify.com',
  },
  {
    title: 'Slack',
    identifier: 'faizaolagunju@gmail.com',
    password: 'test1234',
    link: 'slack.com',
  },
];
