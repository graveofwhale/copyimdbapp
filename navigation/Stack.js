import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { colors } from '../assets/colors'
import Detail from '../screens/Detail';


const NativeStack = createNativeStackNavigator();


export default function Stack() {
    return (
        <NativeStack.Navigator
            screenOptions={{
                // presentation: "card",
                // animation: "slide_from_right",
                // headerTitleAlign: "center",
                // headerTintColor: colors.yellow,
                // headerBackButtonDisplayMode: "default",
                headerBackVisible: false,
            }}>
            <NativeStack.Screen name="Detail" component={Detail} />
        </NativeStack.Navigator>
    )
}