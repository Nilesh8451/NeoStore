import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import FlatButton from '../shared/button';
import CustomModal from '../shared/modal';
import Toast from 'react-native-simple-toast';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {baseUrl, getProductById} from '../baseUrl';

function ProductDetail({navigation, route}) {
  const product_id = route.params.product_id;
  const productArray = [];
  const [openModal, setOpenModal] = useState(false);
  const [ratingValue, setRatingValue] = useState('');
  const [subImages, setSubImages] = useState([]);
  const [myProduct, setMYProduct] = useState({});

  useEffect(() => {
    axios
      .get(`${baseUrl}/${getProductById}/${product_id}`)
      .then((res) => {
        console.log('This is res', res.data.product_details[0]);
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
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  console.log('Sube images', subImages);

  return myProduct._id ? (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{}}>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'yellow',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              width: '90%',
              // backgroundColor: 'white',
              // backgroundColor: 'orange',
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
                {myProduct?.product_cost}
              </Text>

              <View
                style={{
                  // backgroundColor: 'pink',
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
          Toast.show(
            `${myProduct?.product_name} Added To Cart Successfully`,
            Toast.LONG,
          );
          navigation.pop();
        }}
        containerStyle={{
          position: 'absolute',
          backgroundColor: '#2874F0',
          // width: '100%',
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
          style={
            {
              // marginRight: 25,
            }
          }
        />
      </TouchableWithoutFeedback>

      <View
        style={{
          // height: 65,
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
              navigation.navigate('OrderSummary', {
                product: productArray,
              });
              // Toast.show('Item Added To Cart Successfully', Toast.LONG);
              // navigation.pop();
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
                console.log(rate);
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
                console.log('Submit Rating With Rating Of', ratingValue);

                setOpenModal(false);
              }}
            />
          </View>
        </CustomModal>

        <View style={{width: '40%'}}>
          <FlatButton
            title="RATE"
            disabled={!true}
            color={!true ? 'gray' : '#EE5233'}
            // 2874F0
            // FF0000
            onPress={() => {
              setOpenModal(true);
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
          // backgroundColor: 'red',
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
    // backgroundColor: 'red',
  },
});

export default ProductDetail;
