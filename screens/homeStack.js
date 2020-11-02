import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from '../routes/home';
import {View, Text, Keyboard} from 'react-native';
import Cart from '../routes/cart';
import ViewProduct from '../routes/viewProduct';
import ProductDetail from '../routes/productDetail';
import OrderSummary from '../routes/orderSummary';
import SelectAddress from '../routes/selectAddress';

const Stack = createStackNavigator();

function HomeStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'NeoSTORE',
          headerStyle: {
            backgroundColor: '#2874F0',
            // borderBottomWidth: 0,
            elevation: 0,
          },
          // FF0000
          // 2874F0
          // headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerLeft: () => (
            <FontAwesome5
              name={'bars'}
              color="white"
              solid
              size={20}
              style={{
                marginLeft: 20,
              }}
              onPress={() => {
                Keyboard.dismiss();
                navigation.openDrawer();
              }}
            />
          ),
          headerRight: () => (
            <View
              style={{
                // backgroundColor: 'pink',
                paddingVertical: 10,
              }}>
              <FontAwesome5
                name={'shopping-cart'}
                color="white"
                solid
                size={20}
                style={{
                  marginRight: 25,
                }}
                onPress={() => {
                  // logoutHandler();
                  navigation.navigate('Cart');
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: 22,
                  top: -3,
                  backgroundColor: 'red',
                  padding: 1,
                  //   width: 20,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'white',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 12,
                    padding: 2,
                    paddingHorizontal: 4,
                  }}>
                  2
                </Text>
              </View>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#2874F0',
            // borderBottomWidth: 0,
            elevation: 0,
          },
        }}
      />

      <Stack.Screen
        name="ViewProduct"
        component={ViewProduct}
        options={{
          title: 'Products',
          headerStyle: {backgroundColor: '#2874F0'},
          headerTintColor: 'white',
          headerLeft: () => (
            <FontAwesome5
              name={'arrow-left'}
              color="white"
              size={20}
              style={{
                marginLeft: 20,
              }}
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
          ),
          headerRight: () => (
            <View
              style={{
                // backgroundColor: 'pink',
                paddingVertical: 10,
              }}>
              <FontAwesome5
                name={'shopping-cart'}
                color="white"
                solid
                size={20}
                style={{
                  marginRight: 25,
                }}
                onPress={() => {
                  // logoutHandler();
                  navigation.navigate('Cart');
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: 22,
                  top: -3,
                  backgroundColor: 'red',
                  padding: 1,
                  //   width: 20,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'white',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 12,
                    padding: 2,
                    paddingHorizontal: 4,
                  }}>
                  2
                </Text>
              </View>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({route}) => ({
          title: route.params.product_name,
          headerStyle: {backgroundColor: '#2874F0'},
          headerTintColor: 'white',
        })}
      />

      <Stack.Screen
        name="OrderSummary"
        component={OrderSummary}
        options={{
          title: 'Order Summary',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#2874F0',
            // borderBottomWidth: 0,
            elevation: 0,
          },
        }}
      />

      <Stack.Screen
        name="SelectAddress"
        component={SelectAddress}
        options={{
          title: 'Select Address',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#2874F0',
            // borderBottomWidth: 0,
            elevation: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
