import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import FlatButton from '../shared/button';
import {connect} from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  deleteProductFromCart,
} from '../redux/user/userAction';
import {baseUrl} from '../baseUrl';
import SomethingWrong from './somethingWentWrong';

let totalCartCost = 0;
let gstTax = 0;
let totalPay = 0;

/**
 * @author Nilesh Ganpat Chavan
 * @param {object} props is a object contains redux state and some actions to perform changes in redux state.
 * @description This screen contains user cart items along with some buttons to perform action on user cart such as increment & decrement product quantity, delete product from cart, buy all product of cart.
 * @returns jsx which contain cards to show the cart item.
 */

function Cart(props) {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setAllProducts(props.cart);

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
  }, [props.cart]);

  const handleDelete = (product) => {
    Alert.alert(
      'Warning!',
      `Are you sure you want to delete ${product.product_name} from your cart`,
      [
        {
          text: 'NO',
        },
        {
          text: 'YES',
          onPress: () => {
            props.delCartProduct(product.product_id, props.user?.token);
            Toast.show(
              `${product.product_name} removed from your cart successfully`,
              Toast.LONG,
            );
          },
        },
      ],
    );
  };

  if (props.error) {
    return <SomethingWrong />;
  }

  return props.cart.length > 0 ? (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{flex: 1, marginHorizontal: 10, marginVertical: 10}}>
            {allProducts.map((item, index) => {
              var x = item.total;
              x = x.toString();
              var lastThree = x.substring(x.length - 3);
              var otherNumbers = x.substring(0, x.length - 3);
              if (otherNumbers != '') lastThree = ',' + lastThree;
              var productTotalCost =
                otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

              return (
                <TouchableWithoutFeedback key={item._id} onPress={() => {}}>
                  <View
                    style={{...styles.productCardContent, marginBottom: 15}}>
                    <View style={styles.productCard}>
                      <View style={{width: 100, height: 100}}>
                        <Image
                          source={{
                            uri: `${baseUrl}/${item.product_image}`,
                          }}
                          style={styles.cardImage}
                        />
                      </View>
                      <View style={styles.cardDetail}>
                        <Text style={{fontSize: 20, marginRight: 35}}>
                          {item.product_name}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{fontSize: 16, marginTop: 2}}>
                          Quantity: {item.quantity}
                        </Text>
                        <View
                          style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 20, color: '#FE5555'}}>
                            ₹ {productTotalCost}
                          </Text>
                          <View style={styles.cartItemAction}>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                if (item.quantity > 1) {
                                  props.decQuantity(item.product_id);
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
                                {item.quantity}
                              </Text>
                            </View>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                if (item.product_stock == item.quantity) {
                                  Toast.show(
                                    `Product Out Of Stock`,
                                    Toast.SHORT,
                                  );
                                } else if (item.quantity < 10) {
                                  props.incQuantity(item.product_id);
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
                    <TouchableWithoutFeedback
                      onPress={() => {
                        handleDelete(item);
                      }}>
                      <View style={styles.deleteItemMainDiv}>
                        <FontAwesome5
                          name={'times'}
                          color={'black'}
                          solid
                          size={16}
                          style={{opacity: 1, color: 'white'}}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
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
                <Text style={{fontSize: 16}}>₹ {totalCartCost}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 18}}>GST(5%)</Text>
                <Text style={{fontSize: 16}}>₹ {gstTax}</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  Total Amount
                </Text>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  ₹ {totalPay}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.cartBottomAction}>
        <View style={styles.cartBottomInnerDiv}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>₹ {totalPay}</Text>
          <View style={{width: '50%'}}>
            <FlatButton
              title="Place Order"
              disabled={false}
              color={'#2874F0'}
              paddingVertical={8}
              onPress={() => {
                if (props.user?.token === undefined) {
                  Alert.alert('OOPS!', 'Please Login In Order To Buy Products');
                } else {
                  props.navigation.navigate('OrderSummary');
                }
              }}
            />
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.emptyCartDiv}>
      <Image
        source={require('../assets/images/emptycart.png')}
        style={{width: 70, height: 70, opacity: 0.9}}
      />
      <Text
        style={{fontSize: 18, marginTop: 10, fontWeight: 'bold', opacity: 0.8}}>
        YOUR CART IS CURRENTLY EMPTY
      </Text>
      <Text style={{fontSize: 16, marginTop: 10, textAlign: 'center'}}>
        Before proceed to checkout you must add some products to you shopping
        cart. You will find lots of intresting products on our products page
      </Text>
      <View style={{marginTop: 20}}>
        <FlatButton
          title="Go To Product Screen"
          disabled={false}
          color={'#2874F0'}
          paddingHorizontal={20}
          fontSize={14}
          onPress={() => {
            props.navigation.navigate('ViewProduct');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productCardContainer: {
    marginBottom: 20,
  },
  productCardContent: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  productCard: {
    paddingVertical: 20,
    flexDirection: 'row',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  cardDetail: {
    width: '68%',
    marginLeft: 20,
  },
  cartItemAction: {
    width: 110,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyCartDiv: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 30,
    alignItems: 'center',
  },

  cartBottomAction: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: 60,
    backgroundColor: 'white',
    borderTopColor: 'gray',
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBottomInnerDiv: {
    width: '90%',
    maxWidth: 600,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTotalDiv: {
    width: '95%',
    backgroundColor: 'white',
    paddingVertical: 20,
    marginBottom: 75,
    paddingHorizontal: 20,
  },

  deleteItemMainDiv: {
    position: 'absolute',
    right: 20,
    top: 23,
    padding: 3,
    opacity: 0.9,
    backgroundColor: '#EE5233',
  },

  userActionOnCartItem: {
    height: '100%',
    padding: 4,
    paddingHorizontal: 9,
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    cart: state.userReducer.cart,
    error: state.dashBoardReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    decQuantity: (id) => dispatch(decrementQuantity(id)),
    incQuantity: (id) => dispatch(incrementQuantity(id)),
    delCartProduct: (id, token) => dispatch(deleteProductFromCart(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
