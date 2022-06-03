import React from 'react';
import RNBootSplash from "react-native-bootsplash";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ForgetPassword,
  Home,
  OnBoarding,
  PlaneDetails,
  AddPlane,
  About,
  Notes,
  Profile,
  SignIn,
  Initial,
  SignUp,
  Request,
  ChangePassword,
  HowWillGo,
  PrivacyPolicy,
  ChooseSchool,
  AddNote,
  ChooseYourSeat,
  MonthlyVisitsPlane,
  SideBar,
  Splash,
  EditProfile,
  EditPlane,
  DriverInformation,
  MonthlyPlanSelection,
  SchoolRoute,
  SchoolLocation,
  ShowNote,
  ExportPlan,
  ActualPlan,
} from '../screens';
import {ManagerHome, ManagerPlans, ManagerPlan} from '../ManagerScreens';
import {HeadHome, HeadPlan} from '../HeadScreens';
import {DriverHome, DriverDetails, DriverPlan} from '../DriverScreens';
import MoreSignupDetails from '../screens/SignUp/more-signup-details.screen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawerContent} from '../components';
const Drawer = createDrawerNavigator();
const AppStack = createNativeStackNavigator();

function MyDrawer() {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>
      <Drawer.Navigator
        edgeWidth={0}
        screenOptions={{
          swipeEnabled: false,
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#10B1B1',
            width: 300,
          },
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="AppNavigator" component={AppNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}} animationEnabled>
      <AppStack.Screen name={'Initial'} component={Initial} />
      <AppStack.Screen name={'OnBoarding'} component={OnBoarding} />
      <AppStack.Screen name={'SignIn'} component={SignIn} />
      <AppStack.Screen name={'SignUp'} component={SignUp} />
      <AppStack.Screen
        name={'MoreSignupDetails'}
        component={MoreSignupDetails}
      />
      <AppStack.Screen name={'ForgetPassword'} component={ForgetPassword} />
      {/* Newly Added */}
      <AppStack.Screen name={'Home'} component={Home} />
      <AppStack.Screen name={'HowWillGo'} component={HowWillGo} />
      <AppStack.Screen name={'AddPlane'} component={AddPlane} />
      <AppStack.Screen name={'ChooseSchool'} component={ChooseSchool} />
      <AppStack.Screen name={'PlaneDetails'} component={PlaneDetails} />
      <AppStack.Screen name={'Notes'} component={Notes} />
      <AppStack.Screen name={'ChooseYourSeat'} component={ChooseYourSeat} />
      <AppStack.Screen name={'AddNote'} component={AddNote} />
      <AppStack.Screen name={'Profile'} component={Profile} />
      <AppStack.Screen name={'ChangePassword'} component={ChangePassword} />
      <AppStack.Screen
        name={'MonthlyPlanSelection'}
        component={MonthlyPlanSelection}
      />
      <AppStack.Screen name={'SchoolRoute'} component={SchoolRoute} />
      <AppStack.Screen name={'SchoolLocation'} component={SchoolLocation} />
      <AppStack.Screen name={'ShowNote'} component={ShowNote} />
      {/* DOES NOT EXIST IN XD */}
      <AppStack.Screen name={'Request'} component={Request} />
      <AppStack.Screen name={'About'} component={About} />
      {/* EMPTY SCREENS */}
      <AppStack.Screen
        name={'MonthlyVisitsPlane'}
        component={MonthlyVisitsPlane}
      />
      <AppStack.Screen name={'SideBar'} component={SideBar} />
      <AppStack.Screen name={'Splash'} component={Splash} />
      <AppStack.Screen name={'EditProfile'} component={EditProfile} />
      <AppStack.Screen name={'EditPlane'} component={EditPlane} />
      <AppStack.Screen
        name={'DriverInformation'}
        component={DriverInformation}
      />
      <AppStack.Screen name={'ExportPlan'} component={ExportPlan} />
      <AppStack.Screen name={'ActualPlan'} component={ActualPlan} />
      <AppStack.Screen name={'PrivacyPolicy'} component={PrivacyPolicy} />
      {/* MANAGER SCREENS */}
      <AppStack.Screen name={'ManagerHome'} component={ManagerHome} />
      <AppStack.Screen name={'ManagerPlans'} component={ManagerPlans} />
      <AppStack.Screen name={'ManagerPlan'} component={ManagerPlan} />
      {/* HEAD SCREENS */}
      <AppStack.Screen name={'HeadHome'} component={HeadHome} />
      <AppStack.Screen name={'HeadPlan'} component={HeadPlan} />
      {/* DRIVER SCREENS */}
      <AppStack.Screen name={'DriverHome'} component={DriverHome} />
      <AppStack.Screen name={'DriverDetails'} component={DriverDetails} />
      <AppStack.Screen name={'DriverPlan'} component={DriverPlan} />
    </AppStack.Navigator>
  );
}

export const Navigator = () => MyDrawer();
