import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

/**
 * @author Nilesh Ganpat Chavan
 * @param {totalPrice,gst,payAmount} props totalPrice is a total price of product that user want to buy, gst is gst tax applied to all products, payAmount is total amount user has to pay for product.
 * @description this screen give information to user about total cost user has to pay.
 * @return jsx.
 */

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
