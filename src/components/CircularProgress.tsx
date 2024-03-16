import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
/**
 * Override styles that get passed from props
 **/
propStyle = (percent, base_degrees) => {
  const rotateBy = base_degrees + percent * 3.6;
  return {
    transform: [{rotateZ: `${rotateBy}deg`}],
  };
};

renderThirdLayer = percent => {
  if (percent > 50) {
    /**
     * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
     * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
     * before passing to the propStyle function
     **/
    return (
      <View
        style={[
          styles.secondProgressLayer,
          propStyle(percent - 50, 45),
        ]}></View>
    );
  } else {
    return <View style={styles.offsetLayer}></View>;
  }
};

const CircularProgress = ({percent}) => {
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
      {renderThirdLayer(percent)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderWidth: 10,
    borderRadius: 120,
    borderColor: COLORS.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstProgressLayer: {
    width: 120,
    height: 120,
    borderWidth: 10,
    borderRadius: 120,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: COLORS.success,
    borderTopColor: COLORS.success,
    transform: [{rotateZ: '-135deg'}],
  },
  secondProgressLayer: {
    width: 120,
    height: 120,
    position: 'absolute',
    borderWidth: 10,
    borderRadius: 120,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: COLORS.success,
    borderTopColor: COLORS.success,
    transform: [{rotateZ: '45deg'}],
  },
  offsetLayer: {
    width: 120,
    height: 120,
    position: 'absolute',
    borderWidth: 10,
    borderRadius: 120,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: COLORS.grey,
    borderTopColor: COLORS.grey,
    transform: [{rotateZ: '-135deg'}],
  },
});

export default CircularProgress;
