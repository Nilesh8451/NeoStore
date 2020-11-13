import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import FlatButton from '../shared/button';
import {
  getCustomerAddress,
  getCustomerOrderDetails,
} from '../redux/user/userAction';
import {baseUrl, productToCartCheckout} from '../baseUrl';
import LottieView from 'lottie-react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

/**
 * @author Nilesh Ganpat Chavan
 * @param {object} props contains user information and single product that user want to buy and some actions that user can use to perform some action on redux store.
 * @description this screen will show product and button to select delivery address and increment, decrement to change quantity of product.
 * @returns jsx
 */

function SingleOrderSummary(props) {
  const [selectedAddress, setSelectedAddress] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [gst, setGst] = useState(0);
  const [grandTotal, setGrantTotal] = useState(0);
  //   console.log(props.route.params.product);
  const product = props.route.params.product;

  useEffect(() => {
    setQuantity(1);
    setTotalPrice(product.product_cost);
    const tax = Math.round(product.product_cost * 0.05);
    setGst(tax);
    setGrantTotal(tax + product.product_cost);
  }, []);

  useEffect(() => {
    if (props.user?.token) {
      props.getCustAdd(props.user.token);
    }
  }, [props.user]);

  const incrementQuantity = () => {
    const grantVal = totalPrice + product.product_cost;
    const tax = Math.round(grantVal * 0.05);
    setGst(tax);
    setGrantTotal(tax + grantVal);
    setQuantity((prevCount) => prevCount + 1);
    setTotalPrice((prevTotal) => prevTotal + product.product_cost);
  };

  const decrementQuantity = () => {
    const grantVal = totalPrice - product.product_cost;
    const tax = Math.round(grantVal * 0.05);
    setGst(tax);
    setGrantTotal(tax + grantVal);
    setQuantity((prevCount) => prevCount - 1);
    setTotalPrice((prevTotal) => prevTotal - product.product_cost);
  };

  const orderUserProduct = () => {
    const orderData = [];
    product.quantity = quantity;
    product.total = totalPrice;
    orderData.push(product);
    orderData.push({flag: 'checkout'});

    setIsLoading(true);

    axios
      .post(`${baseUrl}/${productToCartCheckout}`, orderData, {
        headers: {
          Authorization: `bearer ${props.user?.token}`,
        },
      })
      .then((res) => {
        // console.log('Product To Checkout Response ', res);
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

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 20,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
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
                      Quantity: {quantity}
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
                <View style={styles.productActionContainer}>
                  <View style={styles.cartItemAction}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        if (quantity > 1) {
                          decrementQuantity();
                        } else {
                          Toast.show(
                            `Mininum limit reached, Click on Delete icon to delete item from cart`,
                            Toast.SHORT,
                          );
                        }
                      }}>
                      <View
                        style={{
                          ...styles.userActionOnCartItem,
                          marginRight: 2,
                          borderRightWidth: 1,
                          borderRightColor: 'gray',
                        }}>
                        <FontAwesome5
                          name={'minus'}
                          color={'black'}
                          solid
                          size={17}
                          style={{opacity: 0.6}}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                    <View
                      style={{
                        ...styles.userActionOnCartItem,
                        marginRight: 2,
                        borderRightWidth: 1,
                        borderRightColor: 'gray',
                      }}>
                      <Text style={{fontWeight: 'bold', fontSize: 18}}>
                        {quantity}
                      </Text>
                    </View>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        if (quantity < 10) {
                          incrementQuantity();
                        } else {
                          Toast.show(
                            `Maximum limit reached for this product.`,
                            Toast.SHORT,
                          );
                        }
                      }}>
                      <View style={styles.userActionOnCartItem}>
                        <FontAwesome5
                          name={'plus'}
                          color={'black'}
                          solid
                          size={17}
                          style={{opacity: 0.6}}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            </View>

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
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    Total Amount
                  </Text>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    ₹ {grandTotal}
                  </Text>
                </View>
              </View>
            </View>
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
              Rs. {grandTotal}
            </Text>
            <FlatButton
              title="Order Now"
              disabled={selectedAddress.address === undefined ? true : false}
              paddingVertical={11}
              paddingHorizontal={30}
              color={selectedAddress.address === undefined ? 'gray' : '#2874F0'}
              onPress={() => {
                if (props.user?.token === undefined) {
                  Alert.alert('OOPS!', 'Please Login In Order To Buy Products');
                } else {
                  orderUserProduct();
                }
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
  productActionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  productAction: {
    width: '90%',
    backgroundColor: 'yellow',
  },
  cartItemAction: {
    width: 110,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userActionOnCartItem: {
    height: '100%',
    padding: 4,
    paddingHorizontal: 9,
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  subTotalDiv: {
    width: '95%',
    backgroundColor: 'white',
    paddingVertical: 20,
    marginBottom: 75,
    paddingHorizontal: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustAdd: (token) => dispatch(getCustomerAddress(token)),
    getCustOrderDetail: (token) => dispatch(getCustomerOrderDetails(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrderSummary);
