import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {baseUrl} from '../baseUrl';
import {Rating} from 'react-native-ratings';

function Card({
  index,
  productName,
  productId,
  productImage,
  productCost,
  product,
  navigation,
  rating = false,
}) {
  return (
    <TouchableWithoutFeedback
      index={productId}
      onPress={() => {
        navigation.navigate('ProductDetail', {
          product_name: productName,
          product_id: productId,
        });
      }}>
      <View style={styles.productCardContent}>
        <View style={styles.productCard}>
          <ImageBackground
            source={{
              uri: `${baseUrl}/${productImage}`,
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode={'cover'}
            borderRadius={6}
            imageStyle={{}}>
            <View
              style={{
                ...styles.productInfoWrapper,
                justifyContent: index % 2 ? 'flex-start' : 'flex-end',
              }}>
              <View
                style={{
                  marginLeft: index % 2 && 30,
                  marginRight: index % 2 ? 0 : 30,
                  alignItems: index % 2 ? 'flex-start' : 'flex-end',
                  maxWidth: 200,
                }}>
                <Text style={{fontSize: 21, color: 'white'}} numberOfLines={1}>
                  {productName}
                </Text>
                {rating && (
                  <Rating
                    ratingCount={5}
                    startingValue={parseFloat(product.product_rating)}
                    imageSize={20}
                    type={'custom'}
                    readonly={true}
                    tintColor="rgba( 0, 0, 0, 0.7 )"
                  />
                )}

                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  ₹ {productCost}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  productCardContent: {
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  productCard: {
    flexDirection: 'row',
    height: 120,
  },
  productInfoWrapper: {
    flex: 1,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
  },
});

export default Card;
