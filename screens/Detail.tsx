import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { Moive, moviesApi, TV, tvApi } from "../api";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../assets/colors";
import { useQuery } from "@tanstack/react-query";



const { height: SCREEN_HEIGHT } = Dimensions.get("window")

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor}
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

const Overview = styled.Text`
    color:${(props) => props.theme.textColor};
    margin-top: 20px;
    padding: 0px 20px;
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

    const { isLoading: moviesLoading, data: moviesData } = useQuery({ queryKey: ["movies", params.id], queryFn: moviesApi.detail, enabled: "original_title" in params });
    const { isLoading: tvLoading, data: tvData } = useQuery({ queryKey: ["tv", params.id], queryFn: tvApi.detail, enabled: "original_name" in params });
    useEffect(() => {
        setOptions({
            title: "original_title" in params
                ? "Movie"
                : "TV",
        })
    }, [])
    console.log("movies :", moviesData)
    console.log("tv :", tvData)
    //console.log('well see :', params)
    //console.log('data :', fullData) // 들어온 데이터 확인
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
            <Overview>{params.overview}</Overview>
        </Container >
    );
}
export default Detail;