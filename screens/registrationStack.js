import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Registration from '../routes/registration';
const Stack = createStackNavigator();

function RegisterStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Registration}
        options={{
          title: 'Register',
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
    </Stack.Navigator>
  );
}

export default RegisterStack;
