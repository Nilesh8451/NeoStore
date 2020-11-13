import React from 'react';
import {View, Text, Image} from 'react-native';

/**
 * @author Nilesh Ganpat Chavan
 * @description this screen will be seen by user if something wrong happens while performing any action.
 * @returns jsx
 */

function SomethingWrong() {
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      {/* <Image
        style={{width: 200, height: 200, marginTop: 60}}
        source={require('../assets/images/somethingWrong.png')}
      /> */}
      <Image
        style={{width: 250, height: 250, marginTop: 60}}
        source={require('../assets/images/oops.jpg')}
      />

      <Text style={{fontSize: 22, fontWeight: 'bold'}}>
        Something went wrong!
      </Text>
      <Text
        style={{fontSize: 19, fontWeight: 'bold', opacity: 0.8, marginTop: 10}}>
        Please come back later.
      </Text>
    </View>
  );
}

export default SomethingWrong;
