import React from "react";
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";
import Detail from "../screens/Detail";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Moive } from "../api";

const BgImg = styled.Image``;


const Title = styled.Text<{ isDark: boolean }>`
    font-size: 16px;
    font-weight: 600;    
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;
const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;    
`;
const Column = styled.View`
    width: 40%;
    margin-left: 15px;
    
`;
const Overview = styled.Text<{ isDark: boolean }>`
    margin-top: 5px;
    color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.8)")};
`;
const Votes = styled(Overview)`
    font-size: 12px;
`;
type RootStackParamList = {
    Stack: {
        screen: string,
        params: {},
    };
};
interface SlideProps {
    backdropPath: string;
    posterPath: string;
    originalTitle: string;
    voteAverage: number;
    overview: string;
    fullData: Moive;
}

const Slide: React.FC<SlideProps> = ({
    backdropPath,
    posterPath,
    originalTitle,
    voteAverage,
    overview,
    fullData,
}) => {
    const isDark = useColorScheme() === "dark";
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const goToDetail = () => {
        navigation.navigate("Stack", {
            screen: "Detail",
            params: {
                ...fullData,
            },
        })
    }
    return (
        <TouchableWithoutFeedback onPress={goToDetail}>
            <View style={{ flex: 1 }}>
                <BgImg
                    style={StyleSheet.absoluteFill}
                    source={{ uri: makeImgPath(backdropPath) }} />
                <BlurView
                    tint={isDark ? "dark" : "light"}
                    intensity={95}
                    style={StyleSheet.absoluteFill}
                >
                    <Wrapper>
                        <Poster path={posterPath} />
                        <Column>
                            <Title isDark={isDark}>{originalTitle}</Title>
                            {voteAverage > 0 ? (
                                <Votes isDark={isDark}>⭐{voteAverage}/10</Votes>
                            ) : null}
                            <Overview isDark={isDark}>
                                {overview.slice(0, 90)}...
                            </Overview>
                        </Column>
                    </Wrapper>
                </BlurView>
            </View>
        </TouchableWithoutFeedback>
    )

}
export default Slide;