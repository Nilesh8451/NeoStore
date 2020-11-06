import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {baseUrl, getCustOrderDetails} from '../baseUrl';
import LottieView from 'lottie-react-native';

function MyOrders(props) {
  const [myOrder, setMyOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOrderDetail = () => {
    axios
      .get(`${baseUrl}/${getCustOrderDetails}`, {
        headers: {
          Authorization: `bearer ${props.route.params.token}`,
        },
      })
      .then((res) => {
        console.log('This is i want', res.data.product_details);
        setMyOrder(res.data.product_details);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log('This is error', e, e.response);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    getOrderDetail();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          ...styles.container,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          source={require('../assets/json/loader2.json')}
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          loop
        />
      </View>
    );
  } else {
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
              {myOrder.map((item, index) => {
                var x = item.product_details[0].total_cartCost;
                x = x.toString();
                var lastThree = x.substring(x.length - 3);
                var otherNumbers = x.substring(0, x.length - 3);
                if (otherNumbers != '') lastThree = ',' + lastThree;
                var totalCartCost =
                  otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
                  lastThree;

                return (
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
                                // color: '#2874F0',
                                color: '#EF5B3E',
                                // marginTop: 10,
                              }}>
                              {/* {item.product_details[0].total_productCost} */}
                              ₹ {totalCartCost}
                            </Text>
                          </View>
                          <Text
                            numberOfLines={1}
                            style={{fontSize: 16, marginTop: 5}}>
                            Ordered Date : {item.product_details[0].createdAt}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
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
            Before proceed to checkout you must add some products to you
            shopping cart. You will find lots of intresting products on our
            products page
          </Text>
        </View>
      </View>
    );
  }
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
