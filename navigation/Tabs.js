import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import { View, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Stack from './Stack';

const Tab = createBottomTabNavigator();


const Tabs = () => {
    const isDark = useColorScheme() === 'dark'; // 다크모드 여부 확인


    return (
        <Tab.Navigator
            sceneContainerStyle={{ backgroundColor: isDark ? '#1e272e' : 'white' }} // 다크모드 여부에 따라 배경색 변경
            screenOptions={{ // 공통 옵션
                unmountOnBlur: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 600,
                    marginTop: -5
                },
                tabBarStyle: {
                    backgroundColor: isDark ? '#1e272e' : 'white',
                },
                tabBarActiveTintColor: isDark ? '#ffa801' : '#1e272e',
                tabBarInactiveTintColor: isDark ? '#d2dae2' : '#808e9b',
                headerStyle: {
                    backgroundColor: isDark ? '#1e272e' : 'white',
                },
                headerTitleStyle: {
                    color: isDark ? '#ffa801' : '#1e272e',
                },
                headerTitleAlign: "center"
            }}>
            <Tab.Screen name='Movie' component={Movies}
                options={{ // 단일 navigation 옵션
                    tabBarIcon: ({ focused, color, size }) => {
                        //console.log('focused : ', focused, '; color : ', color, '; size : ', size)
                        return <Ionicons name={focused ? "film" : "film-outline"} size={size} color={color} />
                    },
                    // headerShown: false,
                    // headerTitleStyle: { color: "tomato" },
                    // headerRight: () => <View><Text>Hello</Text></View>
                }}
            />
            <Tab.Screen name='TV' component={Tv}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name={focused ? "tv" : "tv-outline"} size={size} color={color} />
                    },
                    // tabBarLabelStyle: {
                    //     fontSize: 16,
                    //     fontFamily: 'Georgia',
                    //     fontWeight: 300,
                    // },
                    // tabBarBadge: 'hello',
                    // tabBarBadgeStyle: { fontSize: 10, backgroundColor: 'red', color: 'white' },
                }} />
            <Tab.Screen name='Search' component={Search}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />
                    },
                }}
            />
        </Tab.Navigator>
    )
};

export default Tabs;

