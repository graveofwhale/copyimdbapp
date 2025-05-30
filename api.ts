import { QueryFunction } from "@tanstack/react-query";

const API_KEY = "7a3633b356521c2f1daafb700635cea5";
const BASE_URL = "https://api.themoviedb.org/3"

export interface Moive {
    adult: boolean,
    backdrop_path: string | null,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string | null,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
}
export interface TV {
    adult: boolean,
    backdrop_path: string | null,
    genre_ids: number[],
    id: number,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string | null,
    first_air_date: string,
    release_date: string,
    name: string,
    vote_average: number,
    vote_count: number,
    media_type: string;
}
interface BaseResponse {
    page: number;
    total_results: number;
    total_pages: number;
}
export interface MovieResponse extends BaseResponse {
    results: Moive[];
}
export interface MovieDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: object;
    budget: number;
    genres: object;
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: object;
    production_countries: object;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: object;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    videos: {
        results: {
            name: string;
            key: string;
            site: string;
        }[];
    };
    images: object;
}
export interface TVDetails {
    backdrop_path: string;
    created_by: object;
    episode_run_time: object;
    first_air_date: string;
    genres: object;
    homepage: string;
    id: number;
    in_production: boolean;
    languages: object;
    last_air_date: string;
    last_episode_to_air: object;
    name: string;
    next_episode_to_air: object;
    networks: object;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: object;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: object;
    production_countries: object;
    seasons: object;
    spoken_languages: object;
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
    videos: {
        results: {
            name: string;
            key: string;
            site: string;
        }[];
    };
    images: object;
}

export interface TVResponse extends BaseResponse {
    results: TV[];
}

type MovieListResponse = QueryFunction<MovieResponse>;
type TVListResponse = QueryFunction<TVResponse>;
interface MovieFetchers {
    trending: MovieListResponse;
    upcoming: MovieListResponse;
    nowPlaying: MovieListResponse;
    search: MovieListResponse;
    detail: QueryFunction<MovieDetails>;
}
interface TVFetchers {
    trending: TVListResponse;
    airingToday: TVListResponse;
    topRated: TVListResponse;
    search: TVListResponse;
    detail: QueryFunction<TVDetails>;
}

export const moviesApi: MovieFetchers = {
    trending: ({ pageParam }) =>
        fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko-KR&page=${pageParam}&region=KR`)
            .then((res) => res.json()),
    // upcoming: () =>
    //     fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`)
    //         .then((res) => res.json()),
    upcoming: ({ pageParam }) => {
        console.log('api들어옴, pageParam 확인', pageParam)
        return (
            fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=${pageParam}`)
                .then((res) => res.json())
        )
        //fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=${pageParam}&region=KR`)
        //한국페이지는 짧다.
    },
    nowPlaying: () =>
        fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`)
            .then((res) => res.json()),
    search: ({ queryKey }) => {
        const [_, query] = queryKey;
        //console.log('searchFetcher : ', query)
        return fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&region=KR&query=${query}`)
            .then((res) => res.json())
    },
    detail: ({ queryKey }) => {
        const [_, id] = queryKey;
        //console.log('searchFetcher : ', query)
        return fetch(
            `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`)
            .then((res) => res.json())
    },
}

export const tvApi: TVFetchers = {
    trending: ({ pageParam }) =>
        fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=ko-KR&page=${pageParam}&region=KR`)
            .then((res) => res.json()),
    airingToday: ({ pageParam }) =>
        fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko-KR&page=${pageParam}&region=KR`)
            .then((res) => res.json()),
    topRated: ({ pageParam }) =>
        fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&page=${pageParam}&region=KR`)
            .then((res) => res.json()),
    search: ({ queryKey }) => {
        const [_, query] = queryKey; // queryKey: ["searchMovie", query], query값만 쓴다는 의미
        //console.log('searchFetcher : ', query)
        return fetch(
            `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko-KR&region=KR&query=${query}`)
            .then((res) => res.json())
    },
    detail: ({ queryKey }) => {
        const [_, id] = queryKey;
        //console.log('searchFetcher : ', query)
        return fetch(
            `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos`)
            .then((res) => res.json())
    },
}