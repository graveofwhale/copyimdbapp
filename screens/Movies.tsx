
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, Text, View, } from "react-native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { Moive, MovieResponse, moviesApi } from "../api";
import { useQuery, useQueryClient } from "@tanstack/react-query";


const { height: SCREEN_HEIGHT } = Dimensions.get("window");
//const SCREEN_WIDTH = Dimensions.get("window").width;

const Container = styled.FlatList`
    background-color: ${(props) => props.theme.mainBgColor};
`as unknown as typeof FlatList;

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.mainBgColor};
`;
const ListTitle = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
`;
const TrendingScroll = styled.FlatList`
    margin-top: 20px;
`as unknown as typeof FlatList;

const ListContainer = styled.View`
    margin-bottom : 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 30px;
`;

const VSeparator = styled.View`
    width: 20px;
`;
const HSeparator = styled.View`
    height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const queryClient = useQueryClient();
    const {
        isLoading: nowPlayingLoading,
        data: nowPlayingData,
        isRefetching: isRefetchingNowPlaying,
    } = useQuery<MovieResponse>({
        queryKey: ["movies", "nowPlaying"],
        queryFn: moviesApi.nowPlaying,
    });
    const {
        isLoading: upcomingLoading,
        data: upcomingData,
        isRefetching: isRefetchingUpcoming,
    } = useQuery<MovieResponse>({
        queryKey: ["movies", "upcoming"],
        queryFn: moviesApi.upcoming,
    });

    const {
        isLoading: trendingLoading,
        data: trendingData,
        isRefetching: isRefetchingTrending,
    } = useQuery<MovieResponse>({
        queryKey: ["movies", "trending"],
        queryFn: moviesApi.trending,
    });

    const onRefresh = async () => {
        queryClient.refetchQueries(["movies"]);
    }


    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    const refreshing = isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpcoming;
    console.log(refreshing)
    //console.log(Object.values(nowPlayingData?.results[0]).map((v) => typeof v))
    return loading ? (
        <Loader>
            <ActivityIndicator size="large" />
        </Loader>
    ) : (
        upcomingData ? <Container
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListHeaderComponent={
                <>
                    <Swiper
                        horizontal
                        loop
                        showsButtons={false}
                        showsPagination={false}
                        autoplay
                        autoplayTimeout={3.5}
                        containerStyle={{
                            marginBottom: 30,
                            width: "100%",
                            height: SCREEN_HEIGHT / 4
                        }}>
                        {nowPlayingData?.results.map((movie) =>
                            <Slide
                                key={movie.id}
                                backdropPath={movie.backdrop_path || "404Error"}
                                posterPath={movie.poster_path || "404Error"}
                                originalTitle={movie.original_title}
                                voteAverage={movie.vote_average}
                                overview={movie.overview}
                            />)}
                    </Swiper>
                    <ListContainer>
                        <ListTitle>Trending Movies</ListTitle>
                        {trendingData ? <TrendingScroll
                            horizontal
                            data={trendingData.results}
                            keyExtractor={(item) => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 20 }}
                            ItemSeparatorComponent={VSeparator}
                            renderItem={({ item }) => (
                                <VMedia
                                    posterPath={item.poster_path || "404"}
                                    originalTitle={item.original_title}
                                    voteAverage={item.vote_average}
                                />)}
                        /> : null}
                    </ListContainer>
                    <ComingSoonTitle>Coming Soon</ComingSoonTitle>
                </>
            }
            data={upcomingData.results}
            keyExtractor={(item) => item.id + ""}
            ItemSeparatorComponent={HSeparator}
            renderItem={({ item }) => (
                <HMedia
                    key={item.id}
                    posterPath={item.poster_path || "404"}
                    originalTitle={item.original_title}
                    overview={item.overview}
                    releaseDate={item.release_date}
                />
            )}
        >
        </Container> : null
    )
};

export default Movies;



