import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, Alert} from 'react-native';
import FlatButton from '../shared/button';
import {connect} from 'react-redux';
import {
  buyProduct,
  getCustomerAddress,
  getCustomerOrderDetails,
} from '../redux/user/userAction';
import axios from 'axios';
import {baseUrl, productToCartCheckout} from '../baseUrl';
import LottieView from 'lottie-react-native';

let totalCartCost = 0;
let gstTax = 0;
let totalPay = 0;

/**
 * @author Nilesh Ganpat Chavan
 * @param {object} props which contains cart and user data from redux store and some actions that we can perform on redux store.
 * @description this screen contains order summary of cart data that user want to buy and option to select address for delivery.
 * @returns jsx
 */

function OrderSummary(props) {
  const [selectedAddress, setSelectedAddress] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cartArray, setCartArray] = useState([]);

  useEffect(() => {
    if (props.user?.token) {
      props.getCustAdd(props.user.token);
    }
  }, [props.user]);

  useEffect(() => {
    if (props.cart?.length > 0) {
      setCartArray(props.cart);

      totalCartCost = props.cart.reduce((prevVal, nextVal) => {
        return prevVal + nextVal.total;
      }, 0);

      gstTax = Math.round(totalCartCost * 0.05);

      totalPay = totalCartCost + gstTax;

      var x = totalPay;
      x = x.toString();
      var lastThree = x.substring(x.length - 3);
      var otherNumbers = x.substring(0, x.length - 3);
      if (otherNumbers != '') lastThree = ',' + lastThree;
      totalPay = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

      setIsLoading(false);
    }
  }, [props.cart]);

  const orderProduct = () => {
    const userCartData = [...cartArray];

    userCartData.push({flag: 'checkout'});

    setIsLoading(true);
    axios
      .post(`${baseUrl}/${productToCartCheckout}`, userCartData, {
        headers: {
          Authorization: `bearer ${props.user?.token}`,
        },
      })
      .then((res) => {
        // console.log('Product To Checkout Response ', res);
        props.buyProd();
        props.getCustOrderDetail(props.user?.token);
        props.navigation.navigate('OrderResponse');
      })
      .catch((e) => {
        // console.log('Product To Checkout Error', e, e.response);
        setIsLoading(false);
        Alert.alert('OOPS!', 'Something Went Wrong, Please Try Again Later!');
        props.navigation.popToTop();
      });
  };

  if (isLoading) {
    return (
      <View
        style={{
          ...styles.container,
          flex: 1,
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
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView contentContainerStyle={{paddingBottom: 80}}>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
              }}>
              <View style={{width: '90%', paddingVertical: 15}}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
                  {props.user?.customer_details?.first_name}{' '}
                  {props.user?.customer_details?.last_name}
                </Text>
                {selectedAddress?.address && (
                  <Text style={styles.selectedAddressView}>
                    {selectedAddress?.address}
                  </Text>
                )}

                <View style={{width: '100%', marginTop: 8}}>
                  <FlatButton
                    title="Select Delivery Address"
                    disabled={false}
                    paddingVertical={8}
                    paddingHorizontal={10}
                    color={'#2874F0'}
                    onPress={() => {
                      props.navigation.navigate('SelectAddress', {
                        setSelectedAddress: setSelectedAddress,
                      });
                    }}
                  />
                </View>
              </View>
            </View>
            {cartArray.map((product, index) => (
              <View
                key={index}
                style={{
                  width: '100%',
                  alignItems: 'center',
                  borderBottomColor: 'gray',
                  borderBottomWidth: index === cartArray.length - 1 ? 0 : 1,
                  paddingVertical: 20,
                }}>
                <View style={styles.productCard}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        width: '60%',
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          opacity: 0.8,
                        }}>
                        {product.product_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          marginTop: 5,
                          opacity: 0.7,
                        }}>
                        Quantity: {product.quantity}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: 'pink',
                      }}>
                      <Image
                        style={{width: 90, height: 80, borderRadius: 8}}
                        source={{
                          uri: `http://180.149.241.208:3022/${product.product_image}`,
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 12,
                    }}>
                    <View
                      style={{
                        width: '60%',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          opacity: 0.7,
                        }}>
                        Price Per Product
                      </Text>
                    </View>
                    <View
                      style={{
                        marginRight: 15,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: '#EF5B3E',
                        }}>
                        ₹ {product.product_cost}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.footerAction}>
          <View
            style={{
              width: '80%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Rs. {totalPay}
            </Text>
            <FlatButton
              title="Order Now"
              disabled={selectedAddress.address === undefined ? true : false}
              paddingVertical={11}
              paddingHorizontal={30}
              color={selectedAddress.address === undefined ? 'gray' : '#2874F0'}
              onPress={() => {
                orderProduct();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  productCard: {
    width: '80%',
    maxWidth: 550,
  },

  selectedAddressView: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    opacity: 0.9,
  },
  footerAction: {
    position: 'absolute',
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    zIndex: 1,
    bottom: 0,
    borderTopColor: 'gray',
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    cart: state.userReducer.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustAdd: (token) => dispatch(getCustomerAddress(token)),
    buyProd: () => dispatch(buyProduct()),
    getCustOrderDetail: (token) => dispatch(getCustomerOrderDetails(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
