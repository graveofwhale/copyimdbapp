
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
import Loader from "../components/Loader";
import HList from "../components/HList";


const { height: SCREEN_HEIGHT } = Dimensions.get("window");
//const SCREEN_WIDTH = Dimensions.get("window").width;

const Container = styled.FlatList`
    background-color: ${(props) => props.theme.mainBgColor};
`as unknown as typeof FlatList;


const TrendingScroll = styled.FlatList`
    margin-top: 20px;
`as unknown as typeof FlatList;

const ListTitle = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;  
`;
const ListContainer = styled.View`
    margin-bottom : 40px;
`;
const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 20px;
`;

const VSeparator = styled.View`
    width: 20px;
`;
const HSeparator = styled.View`
    height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const [refreshing, setRefreshing] = useState(false);
    const queryClient = useQueryClient();
    const {
        isLoading: nowPlayingLoading,
        data: nowPlayingData,
    } = useQuery<MovieResponse>({
        queryKey: ["movies", "nowPlaying"],
        queryFn: moviesApi.nowPlaying,
    });
    const {
        isLoading: upcomingLoading,
        data: upcomingData,
    } = useQuery<MovieResponse>({
        queryKey: ["movies", "upcoming"],
        queryFn: moviesApi.upcoming,
    });

    const {
        isLoading: trendingLoading,
        data: trendingData,

    } = useQuery<MovieResponse>({
        queryKey: ["movies", "trending"],
        queryFn: moviesApi.trending,
    });

    const onRefresh = async () => {
        setRefreshing(true)
        await queryClient.refetchQueries({ queryKey: ["movies"] });
        setRefreshing(false)
    }


    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    console.log('movie loading', refreshing)
    //console.log(Object.values(nowPlayingData?.results[0]).map((v) => typeof v))
    return loading ? (
        <Loader />
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
                                fullData={movie}
                            />)}
                    </Swiper>
                    {trendingData ? (
                        <HList title="Trending Movies" data={trendingData.results} />
                    ) : null}
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
                    fullData={item}
                />
            )}
        >
        </Container> : null
    )
};

export default Movies;



