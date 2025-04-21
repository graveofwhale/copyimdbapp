import { View, Text, TouchableOpacity, useColorScheme, Button } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { colors } from '../assets/colors'
import Detail from '../screens/Detail';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';



const NativeStack = createNativeStackNavigator();


export default function Stack() {
    const isDark = useColorScheme() === 'dark'; // 다크모드 여부 확인
    return (
        <NativeStack.Navigator
            screenOptions={{
                presentation: "modal",
                // animation: "slide_from_bottom",
                headerTintColor: isDark ? colors.yellow : colors.black,
                headerBackButtonDisplayMode: "default",
                headerBackVisible: true, // ios now working
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: isDark ? colors.primary : colors.white,
                },
                headerTitleStyle: {
                    color: isDark ? colors.yellow : colors.primary,
                },
            }}>
            <NativeStack.Screen name="Detail" component={Detail} options={{
                gestureEnabled: true,
            }} />
        </NativeStack.Navigator>
    )
}
//gestureEnabled, ios 용, 밑으로 내리는 기능, 백버튼 대용