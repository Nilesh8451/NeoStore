import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {baseUrl} from '../baseUrl';

/**
 * @author Nilesh Ganpat Chavan
 * @param {object} props which contains user order details of specific order on which user clicked on myOrder screen.
 * @description this screen will show order detail information.
 * @returns jsx
 */

function OrderDetail(props) {
  let subTotal = 0;
  const order = props.route.params.order;

  var x = order.product_details[0].total_cartCost;
  x = x.toString();
  var lastThree = x.substring(x.length - 3);
  var otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers != '') lastThree = ',' + lastThree;
  var totalCartCost =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginBottom: 75,
          }}>
          {order.product_details.map((product, index) => {
            subTotal +=
              product.product_details[0].product_cost * product.quantity;

            var x = product.product_details[0].product_cost;
            x = x.toString();
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '') lastThree = ',' + lastThree;
            var productCost =
              otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

            return (
              <View key={index} style={styles.orderDetailMainDiv}>
                <View style={styles.sliderContainer}>
                  <Image
                    source={{
                      uri: `${baseUrl}/${product.product_details[0].product_image}`,
                    }}
                    resizeMode="cover"
                    style={styles.sliderImage}
                  />
                </View>

                <View style={styles.productContent}>
                  <Text style={{fontSize: 20}}>
                    {product.product_details[0].product_name}(
                    <Text style={{fontSize: 17}}>
                      {product.product_details[0].product_material}
                    </Text>
                    )
                  </Text>

                  <Text style={{fontSize: 17, marginTop: 10}}>
                    <Text style={{fontWeight: 'bold', opacity: 0.8}}>
                      Quantity -{' '}
                    </Text>
                    <Text style={{fontWeight: 'bold', opacity: 0.8}}>
                      {product.quantity}
                    </Text>
                  </Text>
                  <Text style={styles.productCostStyle}>₹ {productCost}</Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}></View>
                </View>
              </View>
            );
          })}

          <View style={styles.subTotalMainDiv}>
            <View style={styles.subTotalInnerDiv}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 3,
                }}>
                <Text style={{fontSize: 18}}>Sub Total</Text>
                <Text style={{fontSize: 16}}>₹ {subTotal}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 18}}>GST(5%)</Text>
                <Text style={{fontSize: 16}}>
                  ₹ {Math.round(subTotal * 0.05)}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  Total Amount
                </Text>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  ₹ {totalCartCost}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.floatingBottomView}>
        <Text style={{fontSize: 19, fontWeight: 'bold', marginRight: 30}}>
          Total
        </Text>
        <Text style={{fontSize: 19, fontWeight: 'bold', color: 'black'}}>
          ₹ {totalCartCost}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    marginTop: 15,
    marginBottom: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 3,
  },

  sliderImage: {
    height: 120,
    width: 120,
    borderRadius: 8,
  },
  productContent: {
    marginTop: 15,
    flex: 0.95,
  },
  orderDetailMainDiv: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginTop: 15,
    paddingVertical: 10,
    paddingTop: 0,
    paddingHorizontal: 5,
    borderRadius: 6,
  },
  productCostStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EF5B3E',
    flexDirection: 'row',
    textAlign: 'right',
    justifyContent: 'flex-end',
    marginRight: 25,
    marginBottom: 5,
  },

  subTotalMainDiv: {
    width: '90%',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTotalInnerDiv: {
    width: '95%',
    backgroundColor: 'white',
    paddingVertical: 20,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  floatingBottomView: {
    position: 'absolute',
    bottom: 0,
    height: 55,
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: 0.6,
    borderTopColor: 'gray',
  },
});

export default OrderDetail;
