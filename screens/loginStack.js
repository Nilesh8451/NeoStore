import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../routes/login';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ForgotPassword from '../routes/forgotPassword';
import SetPassword from '../routes/setPassword';
const Stack = createStackNavigator();

function LoginStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
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
