import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View, Text, StyleSheet, SafeAreaView, Alert, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {signOut, addProductToCartCheckout} from '../redux/user/userAction';
import {baseUrl} from '../baseUrl';

/**
 * @author Nilesh Ganpat Chavan
 * @param {object} props which contains navigation object use to navigate between different screens.
 * @description this screen contains drawer content which contains user information if logged in else will show Neostore logo along with different options to navigate between availble screens based on login status.
 * @returns jsx
 */

function DrawerContent({...props}) {
  signoutHandler = () => {
    Alert.alert('Warning!', 'Are you sure you want to signout', [
      {
        text: 'NO',
      },
      {
        text: 'YES',
        onPress: () => {
          props.addProductToUserCartCheckout(props.cart, props.user?.token);
          props.signOutFn();
        },
      },
    ]);

    props.navigation.closeDrawer();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={styles.userInfoSection}>
        {props.user?.token ? (
          <View style={styles.userSection}>
            <Image
              style={styles.profileImageStyle}
              source={
                props?.user.customer_details?.profile_img
                  ? {
                      uri: `${baseUrl}/${props.user.customer_details.profile_img}`,
                    }
                  : require('../assets/images/userDefaultImage.png')
              }
            />

            <View
              style={{
                marginTop: 10,
              }}>
              <Text style={styles.profileHolderInfo}>
                {props.user.customer_details.first_name}{' '}
                {props.user.customer_details.last_name}
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
              NeoSTORE
            </Text>
          </View>
        )}
      </View>
      <DrawerContentScrollView {...props}>
        <View style={{flex: 1, marginTop: -4}}>
          <View style={{marginTop: 20}}>
            <DrawerItem
              label="Home"
              onPress={() => props.navigation.navigate('Home')}
              labelStyle={{color: 'black', opacity: 0.9}}
              icon={({color, size}) => (
                <FontAwesome5
                  name={'home'}
                  color={'black'}
                  solid
                  size={18}
                  style={styles.iconStyle}
                />
              )}
            />
            <DrawerItem
              label="All Products"
              onPress={() => props.navigation.navigate('ViewProduct')}
              labelStyle={{color: 'black', opacity: 0.9}}
              icon={({color, size}) => (
                <FontAwesome5
                  name={'product-hunt'}
                  color={'black'}
                  solid
                  size={18}
                  style={styles.iconStyle}
                />
              )}
            />

            <DrawerItem
              label="Cart"
              onPress={() => props.navigation.navigate('Cart')}
              labelStyle={{color: 'black', opacity: 0.9, marginLeft: -3}}
              icon={({color, size}) => (
                <FontAwesome5
                  name={'shopping-cart'}
                  color={'black'}
                  solid
                  size={18}
                  style={styles.iconStyle}
                />
              )}
            />
            {props.user?.token && (
              <DrawerItem
                label="My Account"
                onPress={() => props.navigation.navigate('ProfileDrawer')}
                labelStyle={{color: 'black', opacity: 0.9}}
                icon={({color, size}) => (
                  <FontAwesome5
                    name={'user-circle'}
                    color={'black'}
                    solid
                    size={18}
                    style={styles.iconStyle}
                  />
                )}
              />
            )}

            {!props.user?.token && (
              <View>
                <DrawerItem
                  label="User Login"
                  onPress={() => props.navigation.navigate('LoginDrawer')}
                  labelStyle={{color: 'black', opacity: 0.9}}
                  icon={({color, size}) => (
                    <FontAwesome5
                      name={'user'}
                      color={'black'}
                      solid
                      size={18}
                      style={styles.iconStyle}
                    />
                  )}
                />
                <DrawerItem
                  label="User Registration"
                  onPress={() => props.navigation.navigate('RegisterDrawer')}
                  labelStyle={{color: 'black', opacity: 0.9, marginLeft: -7}}
                  icon={({color, size}) => (
                    <FontAwesome5
                      name={'user-plus'}
                      color={'black'}
                      solid
                      size={18}
                      style={styles.iconStyle}
                    />
                  )}
                />
              </View>
            )}
          </View>
        </View>
      </DrawerContentScrollView>
      {props.user?.token && (
        <View style={{position: 'relative', bottom: 0}}>
          <DrawerItem
            label="Signout"
            onPress={() => signoutHandler()}
            labelStyle={{color: 'black', opacity: 0.9}}
            icon={({color, size}) => (
              <FontAwesome5
                name={'sign-out-alt'}
                color={'black'}
                solid
                size={18}
                style={styles.iconStyle}
              />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userInfoSection: {
    height: 125,
    backgroundColor: '#2874F0',
  },
  bottomItem: {},
  iconStyle: {
    opacity: 0.6,
    marginLeft: 10,
  },
  userSection: {
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImageStyle: {
    width: 65,
    height: 65,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: 'white',
  },
  profileHolderInfo: {
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
    color: 'white',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    cart: state.userReducer.cart,
    isLoading: state.userReducer.isLoading,
    error: state.userReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOutFn: () => dispatch(signOut()),
    addProductToUserCartCheckout: (cartData, token) =>
      dispatch(addProductToCartCheckout(cartData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
