import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { View, Text, ScrollView, FlatList, RefreshControl } from "react-native";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
import styled from "styled-components/native";
import HList, { HListSeparator } from "../components/HList";

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const Tv = () => {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);

    const { isLoading: todayLoading, data: todayData, } = useQuery({ queryKey: ["tv", "today"], queryFn: tvApi.airingToday })
    const { isLoading: topLoading, data: topData, } = useQuery({ queryKey: ["tv", "top"], queryFn: tvApi.topRated })
    const { isLoading: trendingLoading, data: trendingData, } = useQuery({ queryKey: ["tv", "trending"], queryFn: tvApi.trending })

    const onRefresh = async () => {
        setRefreshing(true)
        await queryClient.refetchQueries({ queryKey: ["tv"] })
        setRefreshing(false)
    }
    const loading = todayLoading || topLoading || trendingLoading;
    console.log('tv loading', refreshing)
    if (loading) {
        return <Loader />;
    }
    return (
        <Container
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={{ paddingVertical: 30 }}>
            <HList title="Trending TV" data={trendingData.results} />
            <HList title="Airing Today" data={todayData.results} />
            <HList title="Top Rate TV" data={topData.results} />
        </Container>
    )
}
export default Tv;