import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForgetPassword, Home, OnBoarding, PlaneDetails, AddPlane, About, Notes,Profile, SignIn, SignUp,Request, ChangePassword, HowWillGo, PrivacyPolicy, ChooseSchool, AddNote, ChooseYourSeat } from '../screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawerContent } from '../components';

const Drawer = createDrawerNavigator();
const AppStack = createNativeStackNavigator();
function MyDrawer() {
    return (
      <Drawer.Navigator 
         screenOptions={{
          headerShown:false,
          drawerStyle: {
            backgroundColor: '#10B1B1',
            width: 300,
          },}} 
          drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name={'Home'} component={Home}/>
            <Drawer.Screen name="PlaneDetails" component={PlaneDetails} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Request" component={Request} />
            <Drawer.Screen name="ChangePassword" component={ChangePassword}/>
            <Drawer.Screen name="HowWillGo" component={HowWillGo}/>
            <Drawer.Screen name="Notes" component={Notes}/>
            <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy}/>
            <Drawer.Screen name="About" component={About}/>
            <Drawer.Screen name="ChooseSchool" component={ChooseSchool}/>
            <Drawer.Screen name="AddNote" component={AddNote}/>
            <Drawer.Screen name="AddPlane" component={AddPlane}/>
            <Drawer.Screen name="ChooseYourSeat" component={ChooseYourSeat}/>
      </Drawer.Navigator>
    );
  }
  function AppNavigator () { 

    return(
        <NavigationContainer>
            <AppStack.Navigator   screenOptions={{ headerShown:false }}animationEnabled>
                <AppStack.Screen name={'OnBoarding'} component={OnBoarding}/>
                <AppStack.Screen name={'SignIn'} component={SignIn}/>
                <AppStack.Screen name={'SignUp'} component={SignUp}/>
                <AppStack.Screen name={'ForgetPassword'} component={ForgetPassword}/>
                <AppStack.Screen name={'MyDrawer'} component={MyDrawer}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )

}

export const Navigator = () => AppNavigator()