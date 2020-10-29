import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import FlatButton from '../shared/button';
import CustomModal from '../shared/modal';
import Toast from 'react-native-simple-toast';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

function ProductDetail({navigation, route}) {
  const product = route.params.product;
  const [openModal, setOpenModal] = useState(false);
  const [ratingValue, setRatingValue] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={
          {
            // flex: 1,
            // paddingVertical: 60,
            // width: '100%',
            // backgroundColor: 'pink',
          }
        }>
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
                horizontal={true}
                height={200}
                activeDotColor="#FF6347">
                <View style={styles.slide}>
                  <Image
                    source={require('../assets/images/food-banner1.jpg')}
                    resizeMode="cover"
                    style={styles.sliderImage}
                  />
                </View>

                <View style={styles.slide}>
                  <Image
                    source={require('../assets/images/food-banner2.jpg')}
                    resizeMode="cover"
                    style={styles.sliderImage}
                  />
                </View>
                <View style={styles.slide}>
                  <Image
                    source={require('../assets/images/food-banner3.jpg')}
                    resizeMode="cover"
                    style={styles.sliderImage}
                  />
                </View>
                <View style={styles.slide}>
                  <Image
                    source={require('../assets/images/food-banner3.jpg')}
                    resizeMode="cover"
                    style={styles.sliderImage}
                  />
                </View>
              </Swiper>
            </View>
            <View style={styles.productContent}>
              <Text style={{fontSize: 25}}>{product.product_name}</Text>

              <Text style={{fontSize: 18, marginTop: 10}}>
                Product Category - <Text>Bed</Text>
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 10,
                  color: '#EF5B3E',
                }}>
                ₹20000
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
                  startingValue={product.rating}
                  imageSize={20}
                  type={'custom'}
                  readonly={true}
                />
              </View>
              <Text style={{marginTop: 13, fontSize: 17}}>
                <Text style={{fontWeight: 'bold'}}>Produced By : </Text> MAyheu
                Colke
              </Text>
              <Text style={{marginTop: 13, fontSize: 17}}>
                <Text style={{fontWeight: 'bold'}}>Product Description : </Text>
                Make your mou. Part bed, part mattress, the Mou mattress bed is
              </Text>
              <Text style={{marginTop: 13, fontSize: 17}}>
                <Text style={{fontWeight: 'bold'}}>Product Dimension : </Text>
                78 * 8
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableWithoutFeedback
        onPress={() => {
          Toast.show(
            `${product.product_name} Added To Cart Successfully`,
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
