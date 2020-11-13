import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {baseUrl} from '../baseUrl';
import {getCustomerOrderDetails} from '../redux/user/userAction';
import SomethingWrong from './somethingWentWrong';

/**
 * @author Nilesh Ganpat Chavan
 * @param {object} props which contains user information like personal info, order details etc.
 * @description this screen contains my account screen which will contains all information about user and certains features to perform changes in  his/her profile.
 * @returns jsx
 */

function Profile(props) {
  const userInfo = props.user;

  if (props.user?.token === undefined) {
    props.navigation.navigate('Home');
  }

  useEffect(() => {
    if (props.user?.token) {
      props.getCustOrderDetail(props.user.token);
    }
  }, [props.user]);

  if (props.profileError) {
    return <SomethingWrong />;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={styles.accountHolderInfo}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

            <Text style={{marginLeft: 25, fontSize: 19}}>
              {userInfo?.customer_details?.first_name}{' '}
              {userInfo?.customer_details?.last_name}
            </Text>
          </View>
          <View style={styles.userPersonalInfo}>
            <FontAwesome5
              name={'phone-alt'}
              color={'black'}
              solid
              size={18}
              style={{opacity: 0.6}}
              onPress={() => {}}
            />
            <Text style={{marginLeft: 18, fontSize: 16}}>
              {userInfo?.customer_details?.phone_no}
            </Text>
          </View>
          <View
            style={{
              ...styles.userPersonalInfo,
              marginTop: 10,
            }}>
            <FontAwesome5
              name={'envelope'}
              color={'black'}
              solid
              size={18}
              style={{opacity: 0.6}}
              onPress={() => {}}
            />
            <Text style={{marginLeft: 18, fontSize: 16}}>
              {userInfo?.customer_details?.email}
            </Text>
          </View>
        </View>
        <View style={styles.walletOrderView}>
          <View
            style={{
              ...styles.walletOrderChildView,
              borderRightWidth: 0.4,
              borderRightColor: 'gray',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>₹ 0</Text>
            <Text style={{fontSize: 17}}>Wallet</Text>
          </View>
          <View style={styles.walletOrderChildView}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              {props.order?.length}
            </Text>
            <Text style={{fontSize: 17}}>Orders</Text>
          </View>
        </View>
        <View style={{marginTop: 18, marginBottom: 30}}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('MyOrders', {
                token: userInfo.token,
              })
            }>
            <View style={styles.userBottomInfoActionView}>
              <View style={styles.userBottomInfoActionIconParentView}>
                <FontAwesome5
                  name={'first-order'}
                  color={'black'}
                  solid
                  size={18}
                  style={styles.iconStyle}
                />
              </View>

              <Text style={{fontSize: 17, marginLeft: 20}}>My Orders</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('ChangePassword', {
                token: userInfo.token,
              })
            }>
            <View style={styles.userBottomInfoActionView}>
              <View style={styles.userBottomInfoActionIconParentView}>
                <FontAwesome5
                  name={'lock'}
                  color={'black'}
                  solid
                  size={18}
                  style={styles.iconStyle}
                  onPress={() => {}}
                />
              </View>

              <Text style={{fontSize: 17, marginLeft: 20}}>
                Change Password
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('AddAddress', {
                token: userInfo.token,
              })
            }>
            <View style={styles.userBottomInfoActionView}>
              <View style={styles.userBottomInfoActionIconParentView}>
                <FontAwesome5
                  name={'address-card'}
                  color={'black'}
                  solid
                  size={18}
                  style={styles.iconStyle}
                  onPress={() => {}}
                />
              </View>

              <Text style={{fontSize: 17, marginLeft: 20}}>
                Add New Address
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('UpdateAddress', {
                token: userInfo.token,
              })
            }>
            <View style={styles.userBottomInfoActionView}>
              <View style={styles.userBottomInfoActionIconParentView}>
                <FontAwesome5
                  name={'address-card'}
                  color={'black'}
                  solid
                  size={18}
                  style={styles.iconStyle}
                  onPress={() => {}}
                />
              </View>

              <Text style={{fontSize: 17, marginLeft: 20}}>Update Address</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  accountHolderInfo: {
    width: '100%',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  profileImageStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#2874F0',
    borderWidth: 1,
  },
  userPersonalInfo: {
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 5,
    alignItems: 'center',
  },
  walletOrderView: {
    width: '100%',
    height: 75,
    borderTopWidth: 0.4,
    borderBottomWidth: 0.4,
    borderTopColor: 'gray',
    borderBottomColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  walletOrderChildView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '50%',
  },
  userBottomInfoActionView: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  userBottomInfoActionIconParentView: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2874F0',
    borderRadius: 20,
  },
  iconStyle: {
    opacity: 0.9,
    color: 'white',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    profileError: state.userReducer.profileError,
    order: state.userReducer.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustOrderDetail: (token) => dispatch(getCustomerOrderDetails(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
