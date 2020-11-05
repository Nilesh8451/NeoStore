import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../routes/login';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ForgotPassword from '../routes/forgotPassword';
import SetPassword from '../routes/setPassword';
const Stack = createStackNavigator();

/**
 * @author Nilesh Ganpat Chavan
 * @param {navigation}: navigation object is used to navigate between different available screen.
 * @description This function is used to create stack and different screens so that we can place that one over the other which is use while navigation.
 * @returns jsx which contains Stack Navigation Of login Screen
 */

function LoginStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
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
        }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: 'Forgot Password',
          headerStyle: {backgroundColor: '#2874F0'},
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="SetPassword"
        component={SetPassword}
        options={{
          title: 'Set Password',
          headerStyle: {backgroundColor: '#2874F0'},
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}

export default LoginStack;
