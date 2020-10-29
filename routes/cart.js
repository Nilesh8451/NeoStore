import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import {Rating} from 'react-native-ratings';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import FlatButton from '../shared/button';

function Cart(props) {
  const [allProducts, setAllProducts] = useState([
    {
      id: 1,
      rating: 3,
      product_name: 'Nokia Lumia 400',
      product_price: 40000,
    },
    {
      id: 2,
      rating: 5,
      product_name: 'Mou Bed With Mattress',
      product_price: 20000,
    },
    {
      id: 3,
      rating: 4.5,
      product_name: 'IPhone 12',
      product_price: 80000,
    },
    {
      id: 4,
      rating: 3,
      product_name: 'Freedom 251',
      product_price: 251,
    },
    {
      id: 5,
      rating: 4,
      product_name: 'Macbock Pro',
      product_price: 70000,
    },
    {
      id: 6,
      rating: 1.5,
      product_name: 'Macbock Pro2',
      product_price: 70000,
    },
  ]);

  return allProducts.length > 0 ? (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              // backgroundColor: 'yellow',
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            {allProducts.map((item, index) => (
              <Formik
                key={index}
                initialValues={{
                  currentCount: 1,
                  productPrice: item.product_price,
                }}
                onSubmit={(values, action) => {
                  handleSubmit(item, values.feedbackInput);
                  action.resetForm();
                }}>
                {(formikProps) => (
                  <TouchableWithoutFeedback
                    key={item.id}
                    onPress={() => {
                      console.log('Clicked on Card');
                    }}>
                    <View style={styles.productCardContent}>
                      <View style={styles.productCard}>
                        <View style={{width: 100, height: 100}}>
                          <Image
                            source={require('../assets/images/food-banner2.jpg')}
                            style={styles.cardImage}
                          />
                        </View>
                        <View style={styles.cardDetail}>
                          <Text
                            // numberOfLines={1}
                            style={{
                              fontSize: 20,
                              marginRight: 30,
                              // backgroundColor: 'red',
                            }}>
                            {item.product_name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={{fontSize: 16, marginTop: 2}}>
                            Quantity: {formikProps.values.currentCount}
                          </Text>
                          <View
                            style={{
                              marginTop: 10,
                              // backgroundColor: 'red',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#FE5555',
                                // marginTop: 10,
                              }}>
                              {formikProps.values.productPrice}
                            </Text>
                            <View style={styles.cartItemAction}>
                              <View
                                style={{
                                  // width: 30,
                                  height: '100%',
                                  padding: 5,
                                  paddingHorizontal: 9,
                                  // borderRadius: 30,
                                  justifyContent: 'center',
                                  backgroundColor: '#F0F0F0',
                                  marginRight: 2,
                                  borderRightWidth: 1,
                                  borderRightColor: 'gray',
                                }}>
                                <FontAwesome5
                                  name={'minus'}
                                  color={'black'}
                                  solid
                                  size={18}
                                  style={{opacity: 0.6}}
                                  onPress={() => {
                                    if (formikProps.values.currentCount > 1) {
                                      formikProps.setFieldValue(
                                        'currentCount',
                                        formikProps.values.currentCount - 1,
                                      );
                                      formikProps.setFieldValue(
                                        'productPrice',
                                        formikProps.values.productPrice -
                                          formikProps.values.productPrice /
                                            formikProps.values.currentCount,
                                      );
                                    } else {
                                      Toast.show(
                                        `Mininum limit reached, Click on Delete icon to delete item from cart`,
                                        Toast.LONG,
                                      );
                                    }
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  height: '100%',
                                  padding: 5,
                                  paddingHorizontal: 9,
                                  // borderRadius: 30,
                                  justifyContent: 'center',
                                  backgroundColor: '#F0F0F0',
                                  marginRight: 2,
                                  borderRightWidth: 1,
                                  borderRightColor: 'gray',
                                }}>
                                <Text
                                  style={{fontWeight: 'bold', fontSize: 18}}>
                                  {formikProps.values.currentCount}
                                </Text>
                              </View>
                              <View
                                style={{
                                  // width: 30,
                                  height: '100%',
                                  padding: 5,
                                  paddingHorizontal: 9,
                                  // borderRadius: 30,
                                  justifyContent: 'center',
                                  backgroundColor: '#F0F0F0',
                                }}>
                                <FontAwesome5
                                  name={'plus'}
                                  color={'black'}
                                  solid
                                  size={18}
                                  style={{opacity: 0.6}}
                                  onPress={() => {
                                    if (formikProps.values.currentCount < 10) {
                                      formikProps.setFieldValue(
                                        'currentCount',
                                        formikProps.values.currentCount + 1,
                                      );
                                      formikProps.setFieldValue(
                                        'productPrice',
                                        formikProps.values.productPrice +
                                          formikProps.values.productPrice /
                                            formikProps.values.currentCount,
                                      );
                                    } else {
                                      Toast.show(
                                        `Maximum limit reached for this product.`,
                                        Toast.LONG,
                                      );
                                    }
                                  }}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          position: 'absolute',
                          top: 20,
                          right: 10,
                        }}>
                        <FontAwesome5
                          name={'trash-alt'}
                          color={'black'}
                          solid
                          size={18}
                          style={{opacity: 0.6}}
                          onPress={() => {
                            Alert.alert(
                              'Warning!',
                              `Are you sure you want to delete ${item.product_name} from cart`,
                              [
                                {
                                  text: 'NO',
                                },
                                {
                                  text: 'YES',
                                  onPress: () => {
                                    console.log('Deleted');
                                    Toast.show(
                                      `${item.product_name} deleted from cart successfully`,
                                      Toast.LONG,
                                    );
                                  },
                                },
                              ],
                            );
                          }}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              </Formik>
            ))}
          </View>
          <View
            style={{
              // backgroundColor: 'pink',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '95%',
                backgroundColor: 'white',
                paddingVertical: 20,
                // padding: 10,
                marginBottom: 75,
                paddingHorizontal: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 3,
                }}>
                <Text style={{fontSize: 18}}>Sub Total</Text>
                <Text style={{fontSize: 16}}>₹20,000</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 3,
                }}>
                <Text style={{fontSize: 18}}>Delivery Charges</Text>
                <Text style={{fontSize: 16}}>₹200</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                <Text style={{fontSize: 18}}>GST(10%)</Text>
                <Text style={{fontSize: 16}}>₹20</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  Total Amount
                </Text>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>₹20220</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          height: 60,
          backgroundColor: 'white',
          borderTopColor: 'gray',
          borderTopWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            maxWidth: 600,
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>₹20,220</Text>
          <View style={{width: '50%'}}>
            <FlatButton
              title="Place Order"
              disabled={false}
              color={'#2874F0'}
              // 2874F0
              // FF0000
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
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
            // 2874F0
            // FF0000
            onPress={() => {
              props.navigation.navigate('ViewProduct');
            }}
          />
        </View>
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
    width: '68%',
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

export default Cart;
