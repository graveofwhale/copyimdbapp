const API_KEY = "7a3633b356521c2f1daafb700635cea5";
const BASE_URL = "https://api.themoviedb.org/3"


const trending = async () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
        .then((res) => res.json());


const upcoming = () =>
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`)
        .then((res) => res.json());

const nowPlaying = () =>
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`)
        .then((res) => res.json());

export const moviesApi = { trending, upcoming, nowPlaying }