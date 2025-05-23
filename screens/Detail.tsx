import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Button, Dimensions, Linking, Platform, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Moive, moviesApi, TV, tvApi } from "../api";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../assets/colors";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons"
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from "@react-navigation/native";



const { height: SCREEN_HEIGHT } = Dimensions.get("window")

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};    
`;
const Header = styled.View`
    height : ${SCREEN_HEIGHT / 4}px;
    justify-content: flex-end;
    padding: 0px 20px;
`;
const Background = styled.Image``;
const Column = styled.View`
    flex-direction: row;
    width: 80%;
`;
const Title = styled.Text`
    color: white;
    font-size: 36px;
    align-self: flex-end;
    margin-left: 15px;
    font-weight: 500;
`;
const Data = styled.View`
    padding: 0px 20px;
`;
const Overview = styled.Text`
    color:${(props) => props.theme.textColor};
    margin: 20px 0px;
`;
const VideoBtn = styled.TouchableOpacity`
    flex-direction: row;
`;
const BtnText = styled.Text`
    color: white;
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 24px;
    margin-left: 10px;
`;

type RootStackParamList = {
    Detail: Moive | TV;
};
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">
const Detail: React.FC<DetailScreenProps> = ({
    navigation: { setOptions },
    route: { params },
}) => {
    const isMovie = "original_title" in params;
    const { isLoading, data } = useQuery({
        queryKey: [isMovie ? "movies" : "tv", params.id],
        queryFn: isMovie ? moviesApi.detail : tvApi.detail,
        //enabled: "original_title" in params 
    });
    //const { isLoading: tvLoading, data: tvData } = useQuery({ queryKey: ["tv", params.id], queryFn: tvApi.detail, enabled: "original_name" in params });
    const shareMedia = async () => {
        const homepage = isMovie
            ? `https://www.imdb.com/title/${data.imdb_id}/` : data.homepage;
        const isAndroid = Platform.OS === "android";
        if (isAndroid) {
            await Share.share({
                message: `${params.overview}\nCjeck it out: ${homepage}`,
                title: "original_title" in params
                    ? params.original_title
                    : params.original_name,
            })
        }
        else {
            await Share.share({
                url: homepage,
                title: "original_title" in params
                    ? params.original_title
                    : params.original_name,
            })
            const navigation = useNavigation();
            setOptions({ headerLeft: () => <Button title="Back" onPress={() => navigation.goBack()} />, })
        }
    }
    const ShareButton = () => (
        <TouchableOpacity onPress={shareMedia}>
            <Ionicons name="share-outline" color="white" size={24} />
        </TouchableOpacity>
    )

    useEffect(() => {
        setOptions({
            title: "original_title" in params ? "Movie" : "TV",
        })
    }, [])
    useEffect(() => {
        if (data) {
            setOptions({
                headerRight: () => <ShareButton />
            })
        }
    }, [data])
    const openYTLink = async (videoID: string) => {
        const baseUrl = `http://m.youtube.com/watch?v=${videoID}`
        //await Linking.openURL(baseUrl)
        await WebBrowser.openBrowserAsync(baseUrl);
    }
    //console.log("movies :", moviesData)
    //console.log("tv :", tvData)
    //console.log('well see :', params)
    console.log('data :', data) // 들어온 데이터 확인
    return (
        <Container>
            <Header>
                <Background
                    style={StyleSheet.absoluteFill}
                    source={{ uri: makeImgPath(params.backdrop_path || "") }} />
                <LinearGradient
                    // Background Linear Gradient
                    colors={["transparent", colors.primary]}
                    style={StyleSheet.absoluteFill}
                />
                <Column>
                    <Poster path={params.poster_path || ""} />
                    <Title>{"original_title" in params
                        ? params.original_title
                        : params.original_name}
                    </Title>
                </Column>
            </Header>
            <Data>
                <Overview>{params.overview}</Overview>
                {isLoading ? <Loader /> : null}
                {data?.videos?.results?.map((video) => (
                    <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
                        <Ionicons name="logo-youtube" color="white" size={24} />
                        <BtnText>{video.name}</BtnText>
                    </VideoBtn>
                ))}
            </Data>
        </Container >
    );
}
export default Detail;