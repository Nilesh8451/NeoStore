import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import FlatButton from '../shared/button';
import CustomModal from '../shared/modal';
import Toast from 'react-native-simple-toast';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function OrderDetail(props) {
  const order = props.route.params.order;
  const [openModal, setOpenModal] = useState(false);
  const [ratingValue, setRatingValue] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              width: '90%',
              marginBottom: 20,
            }}>
            <View style={styles.sliderContainer}>
              <Image
                source={require('../assets/images/food-banner1.jpg')}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>

            <View style={styles.productContent}>
              <Text style={{fontSize: 25}}>
                {order.product_details[0].product_details[0].product_name}(
                <Text style={{fontSize: 20}}>
                  {order.product_details[0].product_details[0].product_material}
                </Text>
                )
              </Text>

              <Text style={{fontSize: 18, marginTop: 10}}>
                <Text style={{fontWeight: 'bold'}}>Quantity - </Text>
                <Text>{order.product_details[0].quantity}</Text>
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 10,
                  color: '#EF5B3E',
                }}>
                <Text style={{fontWeight: 'bold'}}>Product Cost : </Text>{' '}
                {order.product_details[0].total_productCost}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}></View>
              <Text style={{marginTop: 10, fontSize: 17}}>
                <Text style={{fontWeight: 'bold'}}>Produced By : </Text>{' '}
                {order.product_details[0].product_details[0].product_producer}
              </Text>
              <Text style={{marginTop: 13, fontSize: 17}}>
                <Text style={{fontWeight: 'bold'}}>Product Dimension : </Text>
                {order.product_details[0].product_details[0].product_dimension}
              </Text>
              <Text style={{marginTop: 13, fontSize: 17}}>
                <Text style={{fontWeight: 'bold'}}>Delivery Address : </Text>
                {order.product_details[0].delivery_address}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sliderContainer: {
    height: 200,
    width: '100%',
    marginTop: 15,
    marginBottom: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 3,
  },

  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  productContent: {
    marginTop: 15,
    // backgroundColor: 'red',
  },
});

export default OrderDetail;
