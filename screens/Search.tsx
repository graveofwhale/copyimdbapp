import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { View, Text, Alert, } from "react-native";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;
const SearchBar = styled.TextInput`
    background-color: white;
    padding: 10px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 10px auto;
    margin-bottom: 40px;
`;


const Search = () => {
    const [query, setQuery] = useState("")
    const { isLoading: moviesLoading, data: moviesData, refetch: searchMovies } = useQuery({
        queryKey: ["searchMovie", query],
        queryFn: moviesApi.search,
        enabled: false,
    });
    const { isLoading: tvLoading, data: tvData, refetch: searchTv } = useQuery({
        queryKey: ["searchTv", query],
        queryFn: tvApi.search,
        enabled: false,
    });
    const onChangeText = (text: string) => setQuery(text);
    //console.log(query)
    const onSubmit = () => {
        if (query === "") {
            return;
        }
        searchMovies();
        searchTv();
    }
    //console.log('check :', moviesLoading, moviesData); //받아온 데이터 확인

    return (
        <Container>
            <SearchBar
                placeholder="Search for Movie or TV Show"
                placeholderTextColor="grey"
                returnKeyLabel="search"
                returnKeyType="search"
                autoCapitalize="sentences"
                autoCorrect
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />
            {moviesLoading || tvLoading ? <Loader /> : null}
            {moviesData ? <HList title="Movie Results" data={moviesData.results} /> : null}
            {tvData ? <HList title="TV Results" data={tvData.results} /> : null}

        </Container>
    )
}
export default Search;