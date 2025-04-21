
import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Detail from "../screens/Detail";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Moive, TV } from "../api";

const Container = styled.View`
   align-items: center;
   
 `;

const Title = styled.Text`
   color: ${(props) => props.theme.textColor};
   font-weight: 600;
   margin-top: 7px;
   margin-bottom: 5px;
 `;

interface VMediaProps {
    posterPath: string;
    originalTitle: string;
    voteAverage: number;
    fullData: Moive | TV;
}
type RootStackParamList = {
    Stack: {
        screen: string,
        params: object,
    };
};

const VMedia: React.FC<VMediaProps> = ({
    posterPath,
    originalTitle,
    voteAverage,
    fullData,
}) => {
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
        <TouchableOpacity onPress={goToDetail}>
            <Container>
                <Poster path={posterPath} />
                <Title>
                    {originalTitle.slice(0, 13)}
                    {originalTitle.length > 13 ? "..." : null}
                </Title>
                <Votes votes={voteAverage} />
            </Container>
        </TouchableOpacity>
    );
}

export default VMedia;