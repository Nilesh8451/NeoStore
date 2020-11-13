import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginStack from './screens/loginStack';
import RegisterStack from './screens/registrationStack';
import HomeStack from './screens/homeStack';
import ProfileStack from './screens/profileStack';
import DrawerContent from './routes/drawerContent';

const Drawer = createDrawerNavigator();

/**
 * @author Nilesh Ganpat Chavan
 * @description this screen load first when app opens, this screen contains drawer navigation screens.Default HomeDrawer is opened first.
 * @returns jsx.
 */

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="HomeDrawer"
        drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="HomeDrawer"
          component={HomeStack}
          options={{title: 'Home', swipeEnabled: false}}
        />
        <Drawer.Screen
          name="LoginDrawer"
          component={LoginStack}
          options={{title: 'Login', swipeEnabled: false}}
        />
        <Drawer.Screen
          name="RegisterDrawer"
          component={RegisterStack}
          options={{title: 'Register', swipeEnabled: false}}
        />
        <Drawer.Screen
          name="ProfileDrawer"
          component={ProfileStack}
          options={{title: 'MY Account', swipeEnabled: false}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
