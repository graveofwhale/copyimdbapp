import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { colors } from '../assets/colors'
import Detail from '../screens/Detail';
import styled from 'styled-components/native';



const NativeStack = createNativeStackNavigator();


export default function Stack() {
    const isDark = useColorScheme() === 'dark'; // 다크모드 여부 확인

    return (
        <NativeStack.Navigator
            screenOptions={{
                // presentation: "card",
                // animation: "slide_from_right",
                headerTintColor: isDark ? colors.yellow : colors.black,
                // headerBackButtonDisplayMode: "default",
                headerBackVisible: true,
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: isDark ? colors.primary : colors.white,
                },
                headerTitleStyle: {
                    color: isDark ? colors.yellow : colors.primary,
                }
            }}>
            <NativeStack.Screen name="Detail" component={Detail} />
        </NativeStack.Navigator>
    )
}