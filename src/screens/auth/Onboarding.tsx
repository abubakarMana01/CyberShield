import {
  Animated,
  Image,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useRef} from 'react';
import {AppButton, Text} from '../../components';
import {useNavigate} from '../../hooks';
import {ROUTES} from '../../navs/routes';
import {COLORS} from '../../constants/colors';

const Onboarding = () => {
  const {navigate} = useNavigate();

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderDots = () => {
    const dotPosition = Animated.divide(
      scrollX,
      Dimensions.get('screen').width,
    );

    return (
      <View style={styles.carousel}>
        {ONBOARDING_LIST.map((_, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: ['#777', COLORS.primary, '#777'],
            extrapolate: 'clamp',
          });

          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 20, 6],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                borderRadius: 5,
                marginHorizontal: 3,
                width: dotWidth,
                height: 6,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.carouselContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          data={ONBOARDING_LIST}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: false},
          )}
          renderItem={({item}) => (
            <View style={styles.onboardingContainer}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.carouselImg} />
                {item.largeTitle && (
                  <Text
                    style={{fontSize: 42, fontWeight: '700', marginTop: 12}}>
                    {item.largeTitle}
                  </Text>
                )}
                {item.largeDetailText && (
                  <Text style={{fontSize: 24, marginTop: 4}}>
                    {item.largeDetailText}
                  </Text>
                )}
              </View>
              <View style={styles.textContainer}>
                <View>
                  <Text style={styles.header}>{item.header}</Text>
                  <View style={styles.headerBottomLine} />
                </View>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.detailedText}>{item.detailedText}</Text>
              </View>
            </View>
          )}
        />
        <RenderDots />
      </View>

      <View style={styles.btnsContainer}>
        <AppButton
          text="Register"
          handleClick={() => navigate(ROUTES.REGISTER)}
        />
        <AppButton
          text="Already have an account"
          handleClick={() => navigate(ROUTES.LOGIN)}
          variant="secondary"
        />
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  btnsContainer: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 20,
    paddingTop: 30,
    marginTop: 'auto',
  },
  carouselContainer: {
    flex: 1,
  },
  carouselImg: {
    maxWidth: 230,
    objectFit: 'contain',
  },
  onboardingContainer: {
    justifyContent: 'space-around',
    width: Dimensions.get('window').width,
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 10,
    fontSize: 20,
  },
  headerBottomLine: {
    width: '100%',
    maxWidth: 40,
    height: 1,
    backgroundColor: COLORS.black,
    top: -6,
  },
  titleText: {
    fontSize: 28,
    color: COLORS.black,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 12,
  },
  detailedText: {
    fontSize: 16,
    lineHeight: 24,
  },
  carousel: {
    paddingVertical: Dimensions.get('window').height < 680 ? 25 : 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ONBOARDING_LIST = [
  {
    id: '1',
    header: 'Security',
    title: 'Control your security',
    detailedText:
      'This application is build on blockchain so that you can get 100% security across websites & applications with single app.',
    image: require('../../assets/onboarding1.png'),
  },
  {
    id: '2',
    header: 'Fast',
    title: 'Everything in single click',
    detailedText:
      'Add, generate, store, transfer, sync, export & copy all your passwords in single click. Use autofill for quick action without opening app.',
    image: require('../../assets/onboarding2.png'),
  },
  {
    id: '3',
    largeTitle: 'CyberShield',
    largeDetailText: 'Redefining Security',
    image: require('../../assets/onboarding3.png'),
  },
];
