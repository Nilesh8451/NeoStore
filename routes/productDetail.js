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
import Share from 'react-native-share';
import ImgToBase64 from 'react-native-image-base64';

/**
 * @author Nilesh Ganpat Chavan
 * @param {navigation,route}:navigation is a object which is use to navigate between different screens, route is a object contains product_id property.
 * @description productDetail screen is used to display full details of product which is selected by user.
 * @return jsx which is used to display information about product and also some buttons to perform add to cart, buy product and rate product.
 */

let imageUrl = '';
let base64Data = '';

function ProductDetail({user, addToCart, navigation, route}) {
  const product_id = route.params.product_id;
  const productArray = [];
  const [openModal, setOpenModal] = useState(false);
  const [ratingValue, setRatingValue] = useState('');
  const [subImages, setSubImages] = useState([]);
  const [myProduct, setMYProduct] = useState({});
  const [productCost, setProductCost] = useState('');
  const [error, setError] = useState('');

  const myCustomShare = async () => {
    const shareOptions = {
      message: `${myProduct?.product_name}  http://180.149.241.208:3023/#/productDetails/${product_id}`,
      url: base64Data,
    };

    try {
      const shareResponse = await Share.open(shareOptions);
      console.log(shareResponse);
    } catch (e) {
      // console.log('Error ', e);
    }
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/${getProductById}/${product_id}`)
      .then((res) => {
        // console.log('Get Product By Id Response ', res);
        productArray.push(res.data.product_details[0]);
        setMYProduct(res.data.product_details[0]);
        setSubImages([res.data.product_details[0].product_image]);

        imageUrl = res.data.product_details[0].product_image;

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

        ImgToBase64.getBase64String(`http://180.149.241.208:3022/${imageUrl}`)
          .then((base64String) => {
            // console.log(base64String);
            base64Data = 'data:image/jpeg;base64,' + base64String;
          })
          .catch((err) => console.log(err));
      })
      .catch((e) => {
        // console.log("Get Product By Product Id Error ",e, e.response);
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

              <TouchableWithoutFeedback
                onPress={() => {
                  myCustomShare();
                }}
                containerStyle={{
                  ...styles.floatingButton,
                  ...styles.shareProductContainer,
                }}>
                <FontAwesome5
                  name={'share-alt'}
                  color="white"
                  solid
                  size={24}
                  style={{}}
                />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.productContent}>
              <Text style={{fontSize: 25}}>{myProduct?.product_name}</Text>

              <Text style={{fontSize: 18, marginTop: 10}}>
                <Text style={{fontWeight: 'bold', opacity: 0.8}}>
                  Product Category -{' '}
                </Text>
                <Text> {myProduct?.category_id?.category_name}</Text>
              </Text>

              <Text style={{fontSize: 18, marginTop: 10}}>
                <Text style={{fontWeight: 'bold', opacity: 0.8}}>
                  Status -{' '}
                </Text>
                <Text
                  style={{
                    color: myProduct.product_stock == 0 ? 'red' : 'green',
                    fontWeight: 'bold',
                  }}>
                  {' '}
                  {myProduct.product_stock == 0 ? 'Out Of Stock' : 'In Stock'}
                </Text>
              </Text>

              <Text style={styles.productCostStyle}>₹ {productCost}</Text>

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
          if (myProduct.product_stock == 0) {
            Toast.show('Product Out Of Stock');
          } else {
            addToCart(myProduct);
            navigation.pop();
          }
        }}
        containerStyle={{
          ...styles.floatingButton,
          ...styles.shoppingCartContainer,
        }}>
        <FontAwesome5
          name={'shopping-cart'}
          color="white"
          solid
          size={25}
          style={{}}
        />
      </TouchableWithoutFeedback>

      <View style={styles.bottomActionView}>
        <View style={{width: '40%', height: '80%'}}>
          <FlatButton
            title="Shop Now"
            disabled={!true}
            color={!true ? 'gray' : '#2874F0'}
            onPress={() => {
              if (user?.token) {
                navigation.navigate('BuyProduct', {
                  product: myProduct,
                });
              } else {
                Alert.alert('OOPS!', 'Please Login First To Buy The Product');
              }
            }}
          />
        </View>

        <CustomModal
          open={openModal}
          setOpen={setOpenModal}
          title="Rate Product"
          setClickedVal={() => {}}>
          <View style={styles.rateProductModalView}>
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
  productCostStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#EF5B3E',
  },

  floatingButton: {
    position: 'absolute',
    backgroundColor: '#2874F0',
    width: 50,
    height: 50,
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
  },
  shareProductContainer: {
    width: 50,
    height: 50,
    right: 10,
    bottom: 10,
  },
  shoppingCartContainer: {
    width: 55,
    height: 55,
    right: 15,
    bottom: 82,
  },
  bottomActionView: {
    paddingVertical: 8,
    backgroundColor: 'white',
    borderTopColor: 'gray',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rateProductModalView: {
    height: 110,
    borderWidth: 1,
    marginTop: 10,
    paddingVertical: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
