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
import axios from 'axios';
import {baseUrl, getCustOrderDetails} from '../baseUrl';

function MyOrders(props) {
  const [myOrder, setMyOrder] = useState([]);

  useEffect(() => {
    console.log('Hello', props.route.params.token);

    axios
      .get(`${baseUrl}/${getCustOrderDetails}`, {
        headers: {
          Authorization: `bearer ${props.route.params.token}`,
        },
      })
      .then((res) => {
        console.log('This is i want', res.data.product_details);
        setMyOrder(res.data.product_details);
      })
      .catch((e) => {
        console.log('This is error', e, e.response);
      });
  }, []);

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
