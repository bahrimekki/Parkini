import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
    createStackNavigator,
    CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";

import MapScreen from "../screens/MapScreen";
import Profile from "../screens/Profile";
import { Easing } from "react-native-reanimated";
import { current } from "../Redux/Actions";
import LogIn from "../screens/LogIn";
import SignIn from "../screens/SignIn";
const Tab = createBottomTabNavigator();
const Routes = () => {
    const Stack = createStackNavigator();
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("Router : current");
        dispatch(current());
    }, [dispatch]);
    const isAuth = useSelector((state) => state.UserReducer.isAuth);
    return (
        <NavigationContainer>
            {isAuth === true ? (
                <Tab.Navigator
                    screenOptions={{
                        header: () => null,
                        gestureEnabled: true,
                        gestureDirection: "horizontal",
                        transitionSpec: {
                            open: {
                                animation: "timing",
                                duration: 1000,
                                easing: Easing,
                            },
                            close: {
                                animation: "timing",
                                duration: 300,
                                easing: Easing,
                            },
                        },
                        cardStyleInterpolators:
                            CardStyleInterpolators.forHorizontalIOS,
                        tabBarActiveTintColor: "blue",
                        tabBarInactiveTintColor: "gray",
                    }}
                    initialRouteName="MapScreen"
                >
                    <Tab.Screen
                        name="MapScreen"
                        component={MapScreen}
                        options={{
                            tabBarLabel: "MapScreen",
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons
                                    name="map-outline"
                                    color={color}
                                    size={20}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            tabBarLabel: "Profile",
                            tabBarIcon: ({ color }) => (
                                <Ionicons
                                    name="person-outline"
                                    color={color}
                                    size={20}
                                />
                            ),
                        }}
                    />
                </Tab.Navigator>
            ) : (
                <Stack.Navigator
                    screenOptions={{
                        header: () => null,
                        gestureEnabled: true,
                        gestureDirection: "horizontal",

                        cardStyleInterpolators:
                            CardStyleInterpolators.forHorizontalIOS,
                    }}
                    initialRouteName="LogIn"
                >
                    <Stack.Screen name="LogIn" component={LogIn} />
                    <Stack.Screen name="SignIn" component={SignIn} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

export default Routes;
