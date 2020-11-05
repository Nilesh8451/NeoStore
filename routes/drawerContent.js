import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View, Text, StyleSheet, SafeAreaView, Alert, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {signOut} from '../redux/user/userAction';
import {baseUrl} from '../baseUrl';

function DrawerContent({...props}) {
  signoutHandler = () => {
    Alert.alert('Warning!', 'Are you sure you want to signout', [
      {
        text: 'NO',
      },
      {text: 'YES', onPress: () => props.signOutFn()},
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
          <View
            style={{
              paddingTop: 20,
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 60, height: 60, borderRadius: 40}}
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
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 19,
                  textAlign: 'center',
                  color: 'white',
                }}>
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
                  style={{
                    opacity: 0.6,
                  }}
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
                  style={{
                    opacity: 0.6,
                  }}
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
                  style={{
                    opacity: 0.6,
                  }}
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
                    style={{
                      opacity: 0.6,
                    }}
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
                      style={{
                        opacity: 0.6,
                      }}
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
                      style={{
                        opacity: 0.6,
                      }}
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
                style={{
                  opacity: 0.6,
                }}
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
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    isLoading: state.userReducer.isLoading,
    error: state.userReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOutFn: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
