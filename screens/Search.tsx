import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;
const SearchBar = styled.TextInput`
    background-color: white;
    padding: 10px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 10px auto;
`;


const Search = () => (
    <Container>
        <SearchBar
            placeholder="Search for Movie or TV Show"
            placeholderTextColor="grey"
        />
    </Container>
)
export default Search;