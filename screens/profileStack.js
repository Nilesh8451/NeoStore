import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Profile from '../routes/profile';
import EditProfile from '../routes/editProfile';
import ChangePassword from '../routes/changePassword';
import AddAddress from '../routes/addAddress';
import UpdateAddress from '../routes/updateAddress';
import EditAddress from '../routes/editAddress';
import MyOrders from '../routes/myOrders';
import OrderDetail from '../routes/orderDetail';

const Stack = createStackNavigator();

/**
 * @author Nilesh Ganpat Chavan
 * @param {navigation}: navigation object is used to navigate between different available screen.
 * @description This function is used to create stack and different screens so that we can place that one over the other which is use while navigation.
 * @returns jsx which contains Stack Navigation of Home screen.
 */

function ProfileStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'My Account',
          headerStyle: {backgroundColor: '#2874F0'},
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
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <FontAwesome5
              name={'user-edit'}
              color="white"
              solid
              size={20}
              style={{
                marginRight: 20,
              }}
              onPress={() => {
                // console.log('Edit Page');
                navigation.navigate('EditProfile');
              }}
            />
          ),
        }}
      />

      <Stack.Screen
        name="MyOrders"
        component={MyOrders}
        options={{
          title: 'My Orders',
          headerStyle: {backgroundColor: '#2874F0'},
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Edit Profile',
          headerStyle: {backgroundColor: '#2874F0'},
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: 'Change Password',
          headerStyle: {backgroundColor: '#2874F0'},
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={{
          title: 'Add New Address',
          headerStyle: {backgroundColor: '#2874F0'},
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="UpdateAddress"
        component={UpdateAddress}
        options={{
          title: 'Update Address',
          headerStyle: {backgroundColor: '#2874F0'},
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="EditAddress"
        component={EditAddress}
        options={{
          title: 'Edit Address',
          headerStyle: {backgroundColor: '#2874F0'},
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={({route}) => ({
          title: `${route.params.order_id}`,
          headerStyle: {backgroundColor: '#2874F0'},
          headerTintColor: 'white',
        })}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
