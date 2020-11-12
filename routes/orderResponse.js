import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FlatButton from '../shared/button';

function OrderResponse(props) {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{alignItems: 'center', width: '100%', marginTop: 70}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>
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
