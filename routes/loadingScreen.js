import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import {globalStyles} from '../shared/globalStyle';

function LoadingScreen() {
  return (
    <View
      style={{
        ...globalStyles.authContainer,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        source={require('../assets/json/loader2.json')}
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
        loop
      />
    </View>
  );
}

export default LoadingScreen;
