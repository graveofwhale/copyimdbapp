
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Tabs from './Tabs'
import Stack from './Stack'

const Nav = createNativeStackNavigator()

export default function Root() {
    return (
        <Nav.Navigator screenOptions={{
            headerShown: false,
            presentation: 'containedTransparentModal',
            animation: 'slide_from_bottom',
            animationDuration: 100,
            //sheetAllowedDetents: 'fitToContents'
            //animation: "slide_from_right",
            //headerTitleAlign: "center",
        }}>
            <Nav.Screen name="Tabs" component={Tabs} />
            <Nav.Screen name="Stack" component={Stack}
                options={{
                    //presentation: "containedTransparentModal"
                }} />
        </Nav.Navigator>
    )
}