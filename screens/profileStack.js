import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Profile from '../routes/profile';
import EditProfile from '../routes/editProfile';

const Stack = createStackNavigator();

function ProfileStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'My Account',
          headerStyle: {backgroundColor: '#2874F0'},
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
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <FontAwesome5
              name={'edit'}
              color="white"
              solid
              size={20}
              style={{
                marginRight: 20,
              }}
              onPress={() => {
                console.log('Edit Page');
                navigation.navigate('EditProfile');
              }}
            />
          ),
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
    </Stack.Navigator>
  );
}

export default ProfileStack;
