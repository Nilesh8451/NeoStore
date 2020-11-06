import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import FlatButton from '../shared/button';
import CustomModal from '../shared/modal';
import Toast from 'react-native-simple-toast';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {baseUrl} from '../baseUrl';

function OrderDetail(props) {
  const order = props.route.params.order;
  console.log(order);

  var x = order.product_details[0].total_cartCost;
  x = x.toString();
  var lastThree = x.substring(x.length - 3);
  var otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers != '') lastThree = ',' + lastThree;
  var totalCartCost =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  const [openModal, setOpenModal] = useState(false);
  const [ratingValue, setRatingValue] = useState('');

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
            console.log(product);

            var x = product.product_details[0].product_cost;
            x = x.toString();
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '') lastThree = ',' + lastThree;
            var productCost =
              otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  width: '90%',
                  // marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // backgroundColor: 'yellow',
                  backgroundColor: 'white',
                  marginTop: 15,
                  paddingVertical: 10,
                  paddingTop: 0,
                  paddingHorizontal: 5,
                  borderRadius: 6,
                }}>
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
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      // marginTop: 10,
                      color: '#EF5B3E',
                      flexDirection: 'row',
                      textAlign: 'right',
                      justifyContent: 'flex-end',
                      marginRight: 25,
                      marginBottom: 5,
                    }}>
                    ₹ {productCost}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}></View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={{
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
        }}>
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
    // backgroundColor: 'white',
  },
  sliderContainer: {
    // height: 200,
    // width: '100%',
    marginTop: 15,
    marginBottom: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 3,
  },

  sliderImage: {
    height: 120,
    width: 120,
    // alignSelf: 'center',
    borderRadius: 8,
  },
  productContent: {
    marginTop: 15,
    flex: 0.95,
    // backgroundColor: 'red',
  },
});

export default OrderDetail;
