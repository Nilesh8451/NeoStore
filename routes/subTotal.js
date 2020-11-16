import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function SubTotal({totalPrice, gst, payAmount}) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.subTotalDiv}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 3,
          }}>
          <Text style={{fontSize: 18}}>Sub Total</Text>
          <Text style={{fontSize: 16}}>₹ {totalPrice}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
            marginTop: 10,
          }}>
          <Text style={{fontSize: 18}}>GST(5%)</Text>
          <Text style={{fontSize: 16}}>₹ {gst}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Total Amount</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>₹ {payAmount}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subTotalDiv: {
    width: '95%',
    backgroundColor: 'white',
    paddingVertical: 20,
    marginBottom: 75,
    paddingHorizontal: 20,
  },
});

export default SubTotal;
