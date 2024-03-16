/* eslint-disable react/no-unstable-nested-components */
import {SectionList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Screen, Text} from '../components';
import {COLORS} from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToast} from '../utils';
import {useNavigate} from '../hooks';
import {ROUTES} from '../navs/routes';

const Home = () => {
  const {navigate} = useNavigate();

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    showToast('Copied!');
  };

  return (
    <Screen>
      <View style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={item => item.title + item.identifier}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigate(ROUTES.RECORD_DETAILS, {record: item})}
              style={styles.row}>
              <View style={styles.rowImg}>
                <AntDesign name="android1" size={24} color={COLORS.greyDark} />
              </View>
              <View>
                <Text style={styles.passwordTitle}>{item.title}</Text>
                <Text style={styles.passwordIdentifier}>{item.identifier}</Text>
              </View>
              <TouchableOpacity
                onPress={() => copyToClipboard(item.password)}
                style={styles.copyIconContainer}>
                <Ionicons name="copy-outline" size={24} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          SectionSeparatorComponent={() => (
            <View style={styles.sectionSeparator} />
          )}
        />
      </View>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowImg: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: COLORS.greyLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '500',
  },
  passwordTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  passwordIdentifier: {
    color: COLORS.greyDark,
    marginTop: 4,
  },
  itemSeparator: {
    height: 12,
  },
  sectionSeparator: {
    height: 20,
  },
  copyIconContainer: {
    marginLeft: 'auto',
    opacity: 0.8,
    marginRight: 6,
  },
});

const DATA = [
  {
    title: 'Priority',
    data: [
      {
        title: 'Apple',
        identifier: 'faizaolagunju@gmail.com',
        password: 'test1234',
        link: 'slack.com',
      },
      {
        title: 'Adobe',
        identifier: 'faizaolagunju@gmail.com',
        password: 'test1234',
        link: 'slack.com',
      },
    ],
  },
  {
    title: 'Entertainment',
    data: [
      {
        title: 'Netflix',
        identifier: 'faizaolagunju@gmail.com',
        password: 'test1234',
        link: 'slack.com',
      },
      {
        title: 'Snapchat',
        identifier: 'snapfaiza@gmail.com',
        password: 'test1234',
        link: 'slack.com',
      },
      {
        title: 'Spotify',
        identifier: 'faizaspotify@gmail.com',
        password: 'test1234',
        link: 'slack.com',
      },
    ],
  },
  {
    title: 'Work',
    data: [
      {
        title: 'Slack',
        identifier: 'faizaolagunju@gmail.com',
        password: 'test1234',
        link: 'slack.com',
      },
      {
        title: 'Adobe',
        identifier: 'faizaolagunju@gmail.com',
        password: 'test1234',
        link: 'slack.com',
      },
    ],
  },
];
