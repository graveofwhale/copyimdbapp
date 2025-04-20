import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { Moive, TV } from "../api";

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor}
`;
type RootStackParamList = {
    Detail: Moive | TV;
};
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">
const Detail: React.FC<DetailScreenProps> = ({
    navigation: { setOptions },
    route: { params },
}) => {
    useEffect(() => {
        setOptions({
            title: "original_title" in params
                ? params.original_title
                : params.original_name,
        })
    }, [])
    console.log('well see :', params)
    //console.log('data :', fullData) // 들어온 데이터 확인
    return (
        <Container>

            <Text>Detail</Text>
        </Container >
    );
}
export default Detail;