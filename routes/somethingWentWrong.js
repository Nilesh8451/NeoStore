import React from 'react';
import {View, Text, Image} from 'react-native';

function SomethingWrong() {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image
        style={{width: 200, height: 200, marginTop: 60}}
        source={require('../assets/images/somethingWrong.png')}
      />
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        OOPS! Something went wrong!
      </Text>
      <Text style={{fontSize: 19, fontWeight: 'bold', opacity: 0.8}}>
        Please come back later.
      </Text>
    </View>
  );
}

export default SomethingWrong;
