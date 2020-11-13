import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import FlatButton from '../shared/button';

/**
 * @author Nilesh Ganpat Chavan
 * @param {object} props which contains navigation object used to navigate between different screens.
 * @description this screen will be visible after user successfully placed order.
 * @returns jsx
 */

function OrderResponse(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            marginTop: 70,
            paddingBottom: 50,
          }}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../assets/images/thankYou.png')}
          />
          <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 20}}>
            Thank you for your order
          </Text>
          <Text style={styles.placedOrderInfo}>
            Your order has been placed and is being processed
          </Text>

          <FlatButton
            title="Back To DashBoard"
            disabled={false}
            color={'#2874F0'}
            fontSize={14}
            paddingHorizontal={20}
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  placedOrderInfo: {
    fontSize: 18,
    marginHorizontal: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default OrderResponse;
