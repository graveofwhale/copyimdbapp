import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

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
}

const HList: React.FC<HListProps> = ({ title, data }) => (
    <ListContainer>
        <ListTitle>{title}</ListTitle>
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 30 }}
            ItemSeparatorComponent={HListSeparator}
            keyExtractor={(item) => item.id + ""}
            renderItem={({ item }) => (
                <VMedia
                    posterPath={item.poster_path}
                    originalTitle={item.original_name ?? item.original_title}
                    voteAverage={item.vote_average}
                />
            )}
        />
    </ListContainer>
)

export default HList;
