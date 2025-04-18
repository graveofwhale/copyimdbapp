import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from 'expo-asset';
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styledColors";
import Root from "./navigation/Root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



const queryClient = new QueryClient();
const loadFonts = (fonts: any) => fonts.map((font: any) => Font.loadAsync(font));
const loadImage = (images: any) => images.map(image => {
  if (typeof image === "string") {
    return Image.prefetch(image);
  } else {
    return Asset.loadAsync(image);
  }
})

SplashScreen.preventAutoHideAsync(); // 자동 숨김 방지
export default function App() {
  const isDark = useColorScheme() === 'dark';
  async function preloading() {
    const fonts = loadFonts([Ionicons.font])
    const assets = loadImage([require('./assets/images/post.jpg'), "https://www.dogdrip.net/dvs/d/25/04/14/e12ffcc37ecbc7d426b8fa5daa63e9c9.jpg"])
    await Promise.all([...fonts, ...assets]); // 모든 폰트와 이미지 로드 완료 대기

    // console.log('로딩폰트확인 : ', await fonts)
    // console.log('이미지확인 : ', await assets)

    // await Font.loadAsync(Ionicons.font); // 아이콘 폰트 로드
    // const [{ localUri }] = await Asset.loadAsync(require('./assets/images/post.jpg'));
    // await Image.prefetch("https://www.dogdrip.net/dvs/d/25/04/14/e12ffcc37ecbc7d426b8fa5daa63e9c9.jpg"); // 이미지 로드

    // await new Promise(resolve => setTimeout(resolve, 3000)); // 3초 유지
    await SplashScreen.hideAsync(); // 앱이 준비되면 스플래시 화면 숨김
  }

  useEffect(() => {
    preloading();
  }, []);


  {/* <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}></NavigationContainer> */ }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  text: { fontSize: 20, fontWeight: "bold" }
});