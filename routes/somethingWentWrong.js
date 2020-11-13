import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';

/**
 * @author Nilesh Ganpat Chavan
 * @description this screen will be seen by user if something wrong happens while performing any action.
 * @returns jsx
 */

function SomethingWrong() {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', paddingBottom: 50}}>
          <Image
            style={{width: 250, height: 250, marginTop: 60}}
            source={require('../assets/images/oops.jpg')}
          />
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>
            Something went wrong!
          </Text>
          <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold',
              opacity: 0.8,
              marginTop: 10,
            }}>
            Please come back later.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default SomethingWrong;
