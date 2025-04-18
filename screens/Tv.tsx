import { useQuery } from "@tanstack/react-query";
import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
import styled from "styled-components/native";

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const Tv = () => {
    const { isLoading: todayLoading, data: todayData } = useQuery({ queryKey: ["tv", "today"], queryFn: tvApi.airingToday })
    const { isLoading: topLoading, data: topData } = useQuery({ queryKey: ["tv", "top"], queryFn: tvApi.topRated })
    const { isLoading: trendingLoading, data: trendingData } = useQuery({ queryKey: ["tv", "trending"], queryFn: tvApi.trending })

    const loading = todayLoading || topLoading || trendingLoading;
    if (loading) {
        return <Loader />;
    }
    return (
        <Container>
            <FlatList
                data={trendingData.results}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <VMedia
                        posterPath={item.poster_path}
                        originalTitle={item.original_name}
                        voteAverage={item.vote_average}
                    />
                )}
            />
            <FlatList
                data={todayData.results}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <VMedia
                        posterPath={item.poster_path}
                        originalTitle={item.original_name}
                        voteAverage={item.vote_average}
                    />
                )}
            />
            <FlatList
                data={topData.results}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <VMedia
                        posterPath={item.poster_path}
                        originalTitle={item.original_name}
                        voteAverage={item.vote_average}
                    />
                )}
            />

        </Container>
    )
}
export default Tv;