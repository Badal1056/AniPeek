import React, { createContext, useContext, useReducer } from "react";
import axios from 'axios';

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

// Action Types
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_PICTURES = "GET_PICTURES";
const SET_SEARCH_TRUE = "SET_SEARCH_TRUE";
const SET_SEARCH_FALSE = "SET_SEARCH_FALSE";

// Reducer
const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };
        case GET_POPULAR_ANIME:
            return { ...state, popularAnime: action.payload, loading: false };
        case SEARCH:
            return { ...state, searchResults: action.payload, loading: false };
        case GET_UPCOMING_ANIME:
            return { ...state, upcomingAnime: action.payload, loading: false };
        case GET_AIRING_ANIME:
            return { ...state, airingAnime: action.payload, loading: false };
        case GET_PICTURES:
            return { ...state, pictures: action.payload, loading: false };
        case SET_SEARCH_TRUE:
            return { ...state, isSearch: true };
        case SET_SEARCH_FALSE:
            return { ...state, isSearch: false };
        default:
            return state;
    }
};

export const GlobalContextProvider = ({ children }) => {
    const initialState = {
        popularAnime: [],
        upcomingAnime: [],
        airingAnime: [],
        pictures: [],
        isSearch: false,
        searchResults: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = React.useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
            dispatch({ type: SET_SEARCH_FALSE });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            searchAnime(search);
            dispatch({ type: SET_SEARCH_TRUE });
        } else {
            dispatch({ type: SET_SEARCH_FALSE });
            alert('Please enter a search term');
        }
    };

    const clearSearch = () => {
        setSearch('');
        dispatch({ type: SET_SEARCH_FALSE });
    };

    const getPopularAnime = async () => {
        dispatch({ type: LOADING });
        const response = await axios.get(`${baseUrl}/top/anime?filter=bypopularity`);
        dispatch({ type: GET_POPULAR_ANIME, payload: response.data.data });
    };

    const getUpcomingAnime = async () => {
        dispatch({ type: LOADING });
        const response = await axios.get(`${baseUrl}/top/anime?filter=upcoming`);
        dispatch({ type: GET_UPCOMING_ANIME, payload: response.data.data });
    };

    const getAiringAnime = async () => {
        dispatch({ type: LOADING });
        const response = await axios.get(`${baseUrl}/top/anime?filter=airing`);
        dispatch({ type: GET_AIRING_ANIME, payload: response.data.data });
    };

    const searchAnime = async (anime) => {
        dispatch({ type: LOADING });
        const response = await axios.get(`${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        dispatch({ type: SEARCH, payload: response.data.data });
    };

    const getAnimePictures = async (id) => {
        dispatch({ type: LOADING });
        const response = await axios.get(`${baseUrl}/characters/${id}/pictures`);
        dispatch({ type: GET_PICTURES, payload: response.data.data });
    };

    React.useEffect(() => {
        getPopularAnime();
    }, []);

    return (
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            searchAnime,
            search,
            getPopularAnime,
            getUpcomingAnime,
            getAiringAnime,
            getAnimePictures,
            clearSearch,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
