import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import FlatButton from '../shared/button';

function OrderSummary(props) {
  console.log(props.route.params.product);
  const products = props.route.params.product;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={{paddingBottom: 80}}>
        <View
          style={{
            flex: 1,
            //  backgroundColor: 'pink'
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                width: '90%',
                // backgroundColor: 'yellow',
                paddingVertical: 15,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Nilesh Chavan
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 10,
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                }}>
                201/A, sai baba nagar, navghar road, bhayander east
              </Text>
              <View style={{width: '100%', marginTop: 8}}>
                <FlatButton
                  title="Select Other Address"
                  disabled={false}
                  paddingVertical={8}
                  paddingHorizontal={10}
                  color={'#2874F0'}
                  onPress={() => {
                    // navigation.navigate('OrderSummary');
                  }}
                />
              </View>
            </View>
          </View>
          {products.map((product, index) => (
            <View
              key={index}
              style={{
                width: '100%',
                alignItems: 'center',
                borderBottomColor: 'gray',
                borderBottomWidth: index === products.length - 1 ? 0 : 1,
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
                      width: '50%',
                      //   backgroundColor: 'yellow',
                    }}>
                    <Text style={{fontSize: 21, fontWeight: 'bold'}}>
                      My producr Name wih anything
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '30%',
                      //    backgroundColor: 'pink'
                    }}>
                    <Image
                      style={{width: 70, height: 70}}
                      source={require('../assets/images/food-banner1.jpg')}
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
                      width: '50%',
                      //   backgroundColor: 'yellow'
                    }}>
                    <Text
                      style={{fontSize: 18, fontWeight: 'bold', opacity: 0.7}}>
                      Engineering Wood
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '30%',
                      //    backgroundColor: 'pink'
                    }}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                      Rs 10000
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
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Rs. 12000</Text>
          <FlatButton
            title="Order Now"
            disabled={false}
            paddingVertical={11}
            paddingHorizontal={30}
            color={'#2874F0'}
            onPress={() => {
              // navigation.navigate('OrderSummary');
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    width: '90%',
    maxWidth: 550,
    // backgroundColor: 'red',
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

export default OrderSummary;
