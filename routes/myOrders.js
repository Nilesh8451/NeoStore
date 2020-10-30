import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import FlatButton from '../shared/button';

function MyOrders(props) {
  const [myOrder, setMyOrder] = useState([
    {
      _id: 'ORDERNO_376',
      product_details: [
        {
          _id: '5e09ccbb58b863edc9e81984',
          total_cartCost: '8400',
          isDelivered: false,
          customer_id: 199,
          order_id: 'ORDERNO_376',
          product_id: '5d0b1f354594d26e47774b5e',
          quantity: 1,
          delivery_address:
            'At neosoft technology, mumbai, maharastra-443322, india',
          total_productCost: '80000',
          createdAt: '2019-12-30T10:08:59.106Z',
          __v: 0,
          product_details: [
            {
              _id: '5d0b1f354594d26e47774b5e',
              subImages_id: '5d0b1e0e4594d26e47774b5d',
              category_id: '5cfe3c65ea821930af69281f',
              color_id: '5cfe247ade89f8148fbd0146',
              product_id: '5d0b1f354594d26e47774b5e',
              product_name: 'Iphone 11',
              product_image: '2019-06-20T05-52-53.191Zam2.jpg',
              product_desc:
                'This Bed Is Ergonomically Sound, Stylish And Offers Superb Value For Money. The product requires carpenter assembly and will be provided by the seller',
              product_rating: 'NaN',
              product_producer: 'Apple India',
              product_cost: 80000,
              product_stock: 490,
              product_dimension: '900*1900',
              product_material: 'Metal',
              createdAt: '2019-06-20T05:52:53.219Z',
              __v: 0,
            },
          ],
        },
      ],
    },
    {
      _id: 'ORDERNO_379',
      product_details: [
        {
          _id: '5e09ccbb58b863edc9e81980',
          total_cartCost: '8000',
          isDelivered: false,
          customer_id: 199,
          order_id: 'ORDERNO_379',
          product_id: '5d0b1f354594d26e47774b21',
          quantity: 1,
          delivery_address:
            'At neosoft technology, mumbai, maharastra-443322, india',
          total_productCost: '8000',
          createdAt: '2019-12-30T10:08:59.106Z',
          __v: 0,
          product_details: [
            {
              _id: '5d0b1f354594d26e47774b86',
              subImages_id: '5d0b1e0e4594d26e47774b5d',
              category_id: '5cfe3c65ea821930af69281f',
              color_id: '5cfe247ade89f8148fbd0146',
              product_id: '5d0b1f354594d26e47774b5e',
              product_name: 'FurnitureKraft Kansas Metal Bed',
              product_image: '2019-06-20T05-52-53.191Zam2.jpg',
              product_desc:
                'This Bed Is Ergonomically Sound, Stylish And Offers Superb Value For Money. The product requires carpenter assembly and will be provided by the seller',
              product_rating: 'NaN',
              product_producer: 'Engineering Wood',
              product_cost: 8000,
              product_stock: 490,
              product_dimension: '500*900',
              product_material: 'Metal, Plastic',
              createdAt: '2019-06-20T05:52:53.219Z',
              __v: 0,
            },
          ],
        },
      ],
    },
  ]);

  return myOrder.length > 0 ? (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              // backgroundColor: 'yellow',
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            {myOrder.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  console.log('Clicked on Card');
                  props.navigation.navigate('OrderDetail', {
                    order_id: item.product_details[0].order_id,
                    order: item,
                  });
                }}>
                <View style={styles.productCardContent}>
                  <View style={styles.productCard}>
                    <View style={styles.cardDetail}>
                      <Text
                        // numberOfLines={1}
                        style={{
                          fontSize: 22,
                          //   marginRight: 30,
                          fontWeight: 'bold',
                          // backgroundColor: 'red',
                        }}>
                        ID: {item.product_details[0].order_id}
                      </Text>
                      <View
                        style={{
                          marginTop: -10,
                          width: '93%',
                          //   backgroundColor: 'red',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#2874F0',
                            // marginTop: 10,
                          }}>
                          {item.product_details[0].total_productCost}
                        </Text>
                      </View>
                      <Text
                        numberOfLines={1}
                        style={{fontSize: 16, marginTop: 2}}>
                        Ordered Date : {item.product_details[0].createdAt}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  ) : (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginHorizontal: 10,
          marginVertical: 10,
          paddingVertical: 30,
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/images/emptycart.png')}
          style={{width: 70, height: 70, opacity: 0.9}}
        />
        <Text style={{fontSize: 18, marginTop: 10}}>
          You Haven't Placed Any Order yet
        </Text>
        <Text style={{fontSize: 16, marginTop: 10, textAlign: 'center'}}>
          Before proceed to checkout you must add some products to you shopping
          cart. You will find lots of intresting products on our products page
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'orange',
  },

  productCardContainer: {
    // backgroundColor: 'white',
    marginBottom: 20,
  },
  productCardContent: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  productCard: {
    paddingVertical: 15,

    // backgroundColor: 'pink',
    flexDirection: 'row',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    // marginLeft: 10,
  },
  cardDetail: {
    // backgroundColor: 'red',
    width: '90%',
    marginLeft: 20,
  },
  cartItemAction: {
    // backgroundColor: 'yellow',
    width: 110,
    height: 36,
    // paddingHorizontal: 20,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default MyOrders;
