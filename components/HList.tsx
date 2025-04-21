import React from "react";
import { Alert, FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";
import { Moive, TV } from "../api";

const ListTitle = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
    margin-bottom: 10px;
`;
const ListContainer = styled.View`
    margin-bottom : 40px;
`;

export const HListSeparator = styled.View`
    width: 20px;
`;

interface HListProps {
    title: string;
    data: any[];
    loadFunc?: () => void;
}
// const loadMore = () => {
//     Alert.alert("it work")
// }

const HList: React.FC<HListProps> = ({ title, data, loadFunc }) => (
    <ListContainer>
        <ListTitle>{title}</ListTitle>
        <FlatList
            onEndReached={loadFunc}
            onEndReachedThreshold={1}
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 30 }}
            ItemSeparatorComponent={HListSeparator}
            keyExtractor={(item, index) => `${item.id}-${index}`} //좀더 복잡한 키값얻기 /(item) => item.id + ""
            renderItem={({ item }) => (
                <VMedia
                    posterPath={item.poster_path}
                    originalTitle={item.original_name ?? item.original_title}
                    voteAverage={item.vote_average}
                    fullData={item}
                />
            )}
        />
    </ListContainer>
)

export default HList;
