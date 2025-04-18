import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { colors } from '../assets/colors'


const ScreenOne = ({ navigation: { navigate } }) =>
    <TouchableOpacity onPress={() => navigate("ScreenTwo")}>
        <Text>Go to Two</Text>
    </TouchableOpacity>
const ScreenTwo = ({ navigation: { navigate } }) =>
    <TouchableOpacity onPress={() => navigate("ScreenThree")}>
        <Text>Go to Three</Text>
    </TouchableOpacity>
const ScreenThree = ({ navigation: { navigate } }) =>
    <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
        <Text>Go To Search in Tab Navigation</Text>
    </TouchableOpacity>
const NativeStack = createNativeStackNavigator();


export default function Stack() {
    return (
        <NativeStack.Navigator screenOptions={{
            presentation: "card",
            animation: "slide_from_right",
            headerTitleAlign: "center",
            headerTintColor: colors.yellow,
            headerBackButtonDisplayMode: "default",
        }}>
            <NativeStack.Screen name="ScreenOne" component={ScreenOne} />
            <NativeStack.Screen name="ScreenTwo" component={ScreenTwo} />
            <NativeStack.Screen name="ScreenThree" component={ScreenThree} />
        </NativeStack.Navigator>
    )
}