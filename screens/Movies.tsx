
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, Text, View, } from "react-native";
import Slide from "../components/Slide";

import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";

const API_KEY = "7a3633b356521c2f1daafb700635cea5"
const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`

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
`;

const ListContainer = styled.View`
    margin-bottom : 40px;
`;


const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 30px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
//const SCREEN_WIDTH = Dimensions.get("window").width;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = React.useState(true);
    const [nowPlaying, setNowPlaying] = React.useState([]);
    const [upcoming, setUpcoming] = React.useState([]);
    const [trending, setTrending] = React.useState([]);

    const getTrending = async () => {
        const { results } = await (
            await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
        ).json()
        setTrending(results);
        //console.log('트렌딩:', results)
    }
    const getUpcoming = async () => {
        const { results } = await (
            await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1region=KR`)
        ).json();
        setUpcoming(results);
        //console.log('겟커밍', results)

    }
    const getNowPlaying = async () => {
        const response =
            await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1region=KR`)
        const json = await response.json();
        setNowPlaying(json.results);
    }
    const getData = async () => {
        await Promise.all([getNowPlaying(), getUpcoming(), getTrending()])
        setLoading(false)
    }

    React.useEffect(() => {
        getData();
    }, [])
    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    }
    return loading ? (
        <Loader>
            <ActivityIndicator size="large" />
        </Loader>
    ) : (
        <Container
            refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
        >
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
                {nowPlaying.map((movie) =>
                    <Slide
                        key={movie.id}
                        backdropPath={movie.backdrop_path}
                        posterPath={movie.poster_path}
                        originalTitle={movie.original_title}
                        voteAverage={movie.vote_average}
                        overview={movie.overview}
                    />)}
            </Swiper>
            <ListContainer>
                <ListTitle>Trending Movies</ListTitle>
                <TrendingScroll
                    data={trending}
                    horizontal
                    keyExtractor={(item) => item.id + ""}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                    renderItem={({ item }) => (
                        <VMedia
                            posterPath={item.poster_path}
                            originalTitle={item.original_title}
                            voteAverage={item.vote_average}
                        />
                    )}
                />
            </ListContainer>
            <ComingSoonTitle>Coming Soon</ComingSoonTitle>
            <FlatList
                data={upcoming}
                keyExtractor={(item) => item.id + ""}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                renderItem={({ item }) => (
                    <HMedia
                        key={item.id}
                        posterPath={item.poster_path}
                        originalTitle={item.original_title}
                        overview={item.overview}
                        releaseDate={item.release_date}
                    />
                )}
            />
        </Container>
    )
};

export default Movies;



