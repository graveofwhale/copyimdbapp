import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { View, Text, ScrollView, FlatList, RefreshControl, Alert } from "react-native";
import { tvApi, TVResponse } from "../api";
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

    const { isLoading: todayLoading, data: todayData, hasNextPage: todayHasNextPage, fetchNextPage: todayFetchNextPage } = useInfiniteQuery<TVResponse>({
        queryKey: ["tv", "today"], queryFn: tvApi.airingToday,
        initialPageParam: 1,
        getNextPageParam: (currentPage) => {
            const nextPage = currentPage.page + 1;
            return nextPage > currentPage.total_pages ? null : nextPage;
        },
    });
    const { isLoading: topLoading, data: topData, hasNextPage: topHasNextPage, fetchNextPage: topFetchNextPage } = useInfiniteQuery<TVResponse>({
        queryKey: ["tv", "top"], queryFn: tvApi.topRated,
        initialPageParam: 1,
        getNextPageParam: (currentPage) => {
            const nextPage = currentPage.page + 1;
            return nextPage > currentPage.total_pages ? null : nextPage;
        },
    });
    const { isLoading: trendingLoading, data: trendingData, hasNextPage: trendingHasNextPage, fetchNextPage: trendingFetchNextPage } = useInfiniteQuery<TVResponse>({
        queryKey: ["tv", "trending"], queryFn: tvApi.trending,
        initialPageParam: 1,
        getNextPageParam: (currentPage) => {
            const nextPage = currentPage.page + 1;
            return nextPage > currentPage.total_pages ? null : nextPage;
        },
    });

    //const { isLoading: topLoading, data: topData, } = useQuery({ queryKey: ["tv", "top"], queryFn: tvApi.topRated })
    //const { isLoading: trendingLoading, data: trendingData, } = useQuery({ queryKey: ["tv", "trending"], queryFn: tvApi.trending })

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
    const loadMoreToday = () => {
        if (todayHasNextPage) {
            todayFetchNextPage();
        }
        else if (!todayHasNextPage) {
            Alert.alert("페이지 더 없당")
        }
    }
    const loadMoreTrending = () => {
        if (trendingHasNextPage) {
            trendingFetchNextPage();
        }
        else if (!trendingHasNextPage) {
            Alert.alert("페이지 더 없당")
        }
    }
    const loadMoreTop = () => {
        if (topHasNextPage) {
            topFetchNextPage();
        }
        else if (!topHasNextPage) {
            Alert.alert("페이지 더 없당")
        }
    }
    // console.log("Today Data IDs:", todayData?.pages.flatMap((page) => page.results.map((item) => item.id)));
    // 동일 ID여러번 확인됨됨
    return (
        <Container
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={{ paddingVertical: 30 }}>
            <HList title="Trending TV" data={trendingData?.pages.map((page) => page.results).flat()} loadFunc={loadMoreTrending} />
            <HList title="Airing Today" data={todayData?.pages.map((page) => page.results).flat()} loadFunc={loadMoreToday} />
            <HList title="Top Rate TV" data={topData?.pages.map((page) => page.results).flat()} loadFunc={loadMoreTop} />
        </Container>
    )
}
export default Tv;