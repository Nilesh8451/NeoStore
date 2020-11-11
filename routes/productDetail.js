import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Alert} from 'react-native';
import Swiper from 'react-native-swiper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import FlatButton from '../shared/button';
import CustomModal from '../shared/modal';
import Toast from 'react-native-simple-toast';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {baseUrl, getProductById, rateProductByCustomer} from '../baseUrl';
import {connect} from 'react-redux';
import {addProductToCart} from '../redux/user/userAction';
import SomethingWrong from './somethingWentWrong';

/**
 * @author Nilesh Ganpat Chavan
 * @param {navigation,route}:navigation is a object which is use to navigate between different screens, route is a object contains product_id property.
 * @description productDetail screen is used to display full details of product which is selected by user.
 * @return jsx which is used to display information about product and also some buttons to perform add to cart, buy product and rate product.
 */

function ProductDetail({user, addToCart, navigation, route}) {
  const product_id = route.params.product_id;
  const productArray = [];
  const [openModal, setOpenModal] = useState(false);
  const [ratingValue, setRatingValue] = useState('');
  const [subImages, setSubImages] = useState([]);
  const [myProduct, setMYProduct] = useState({});
  const [productCost, setProductCost] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${baseUrl}/${getProductById}/${product_id}`)
      .then((res) => {
        productArray.push(res.data.product_details[0]);
        setMYProduct(res.data.product_details[0]);
        setSubImages([res.data.product_details[0].product_image]);

        res.data.product_details[0].subImages_id.product_subImages.map(
          (img) => {
            setSubImages((prevState) => {
              return [...prevState, img];
            });
          },
        );

        var x = res.data.product_details[0].product_cost;
        x = x.toString();
        var lastThree = x.substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers != '') lastThree = ',' + lastThree;
        var res =
          otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
        setProductCost(res);
      })
      .catch((e) => {
        // console.log(e, e.response);
        setError('Something Went Wrong, Please Try Again Later');
      });
  }, []);

  if (error) {
    return <SomethingWrong />;
  }

  return myProduct._id ? (
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
              <Swiper
                autoplay
                loop
                horizontal={true}
                height={200}
                activeDotColor="#FF6347">
                {subImages.map((img, index) => (
                  <View style={styles.slide} key={index}>
                    <Image
                      source={{
                        uri: `http://180.149.241.208:3022/${img}`,
                      }}
                      resizeMode="cover"
                      style={styles.sliderImage}
                    />
                  </View>
                ))}
              </Swiper>
            </View>
            <View style={styles.productContent}>
              <Text style={{fontSize: 25}}>{myProduct?.product_name}</Text>

              <Text style={{fontSize: 18, marginTop: 10}}>
                Product Category -{' '}
                <Text> {myProduct?.category_id?.category_name}</Text>
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 10,
                  color: '#EF5B3E',
                }}>
                {/* {myProduct?.product_cost} */}₹ {productCost}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginTop: 13,
                }}>
                <Rating
                  ratingCount={5}
                  startingValue={parseFloat(myProduct?.product_rating)}
                  imageSize={20}
                  type={'custom'}
                  readonly={true}
                />
              </View>
              <Text style={{marginTop: 13, fontSize: 17}}>
                <Text style={{fontWeight: 'bold'}}>Produced By : </Text>{' '}
                {myProduct?.product_producer}
              </Text>
              <Text style={{marginTop: 13, fontSize: 17}}>
                <Text style={{fontWeight: 'bold'}}>Product Description : </Text>
                {myProduct?.product_desc}
              </Text>
              <Text style={{marginTop: 13, fontSize: 17}}>
                <Text style={{fontWeight: 'bold'}}>Product Dimension : </Text>
                {myProduct?.product_dimension}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableWithoutFeedback
        onPress={() => {
          addToCart(myProduct);
          navigation.pop();
        }}
        containerStyle={{
          position: 'absolute',
          backgroundColor: '#2874F0',
          width: 60,
          height: 60,
          right: 15,
          bottom: 82,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
          borderWidth: 0.5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,
          elevation: 15,
        }}>
        <FontAwesome5
          name={'shopping-cart'}
          color="white"
          solid
          size={28}
          style={{}}
        />
      </TouchableWithoutFeedback>

      <View
        style={{
          paddingVertical: 8,
          backgroundColor: 'white',
          borderTopColor: 'gray',
          borderTopWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <View style={{width: '40%', height: '80%'}}>
          <FlatButton
            title="Shop Now"
            disabled={!true}
            color={!true ? 'gray' : '#2874F0'}
            onPress={() => {
              // navigation.navigate('OrderSummary', {
              //   product: productArray,
              // });
            }}
          />
        </View>

        <CustomModal
          open={openModal}
          setOpen={setOpenModal}
          title="Rate Product"
          setClickedVal={() => {}}>
          <View
            style={{
              height: 110,
              borderWidth: 1,
              marginTop: 10,
              paddingVertical: 10,
              paddingVertical: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AirbnbRating
              count={5}
              reviews={['Bad', 'OK', 'Good', 'Very Good', 'Amazing']}
              showRating={true}
              onFinishRating={(rate) => {
                setRatingValue(rate);
              }}
              defaultRating={3}
              size={30}
            />
          </View>
          <View style={{marginTop: 10}}>
            <FlatButton
              title="SUBMIT"
              disabled={!true}
              color={!true ? 'gray' : '#2874F0'}
              onPress={() => {
                // console.log('Submit Rating With Rating Of', ratingValue);
                setOpenModal(false);

                axios
                  .put(
                    `${baseUrl}/${rateProductByCustomer}`,
                    {
                      product_id: route.params.product_id,
                      product_rating: parseFloat(ratingValue),
                    },
                    {
                      headers: {
                        Authorization: `bearer ${user?.token}`,
                      },
                    },
                  )
                  .then((res) => {
                    Toast.show(`${res.data.message}`, Toast.LONG);
                  })
                  .catch((e) => {
                    Toast.show(`Something Went Wrong`, Toast.LONG);
                  });
              }}
            />
          </View>
        </CustomModal>

        <View style={{width: '40%'}}>
          <FlatButton
            title="RATE"
            disabled={!true}
            color={!true ? 'gray' : '#EE5233'}
            onPress={() => {
              if (user?.token) {
                setOpenModal(true);
              } else {
                Alert.alert('OOPS!', 'Please Login First To Rate The Product');
              }
            }}
          />
        </View>
      </View>
    </View>
  ) : (
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

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  productContent: {
    marginTop: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addProductToCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
