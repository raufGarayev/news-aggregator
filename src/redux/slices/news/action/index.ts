import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewsStateType } from '../../../../types/news';

const NEWSAPI_URL = 'https://newsapi.org/v2/'
const NYTAPI_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
const GUARDIANAPI_URL = 'https://content.guardianapis.com/search'

export const getNewsApiQuery = createAsyncThunk(
    'getNewsApiQuery',
    async ({newsFilters, userFilters}: {newsFilters: NewsStateType['newsFilters'], userFilters: NewsStateType['userFilters']}) => {

        let {category, page, pageSize, source, search, dateRange} = newsFilters
        let {sources, categories } = userFilters
        //since NewsApi gives us api for a lot of sources, we ignore the guardians and nyt and dont send request
        if(source === 'The Guardian' || source === 'The New York Times') return Promise.resolve({})

        let query = ''

        //if user searched for news, we ignore the user's preferences and all other filters to have a more accurate search
        if(search) {
            query = `everything?language=en&q=${search}&page=${page}&pageSize=${pageSize}&apiKey=${import.meta.env.VITE_NEWSAPI_API_KEY}`
        } else {
            query = `top-headlines?language=en&page=${page}&pageSize=${pageSize}&apiKey=${import.meta.env.VITE_NEWSAPI_API_KEY}`

            if(dateRange.first_date) query += `&from=${dateRange.first_date}&to=${dateRange.last_date}`

            //newsapi doesnt accept source and category together in requests, so we only send category since it is more specific
            if(category !== '') {
               query += `&category=${category}`
                               
            } else if (categories.length > 0) {
                //newsapi does not support multiple categories, so we only send the first category
                query += `&category=${categories[0]}`
                source = ''
                sources = []
            } else if(source !== '') {
                query += `&sources=${source}`
            } else if(sources.length > 0) {
                query += `&sources=${sources.join(',')}`
            }
        }
        
        const response = await fetch(`${NEWSAPI_URL}${query}`);
        return response.json();
    }
)

export const getNYTApiQuery = createAsyncThunk(
    'getNYTApiQuery',
    async ({newsFilters, userFilters}: {newsFilters: NewsStateType['newsFilters'], userFilters: NewsStateType['userFilters']}) => {

        let {category, page, source, search, dateRange} = newsFilters
        let {sources, categories } = userFilters

        //if user doesnt include The New York Times in his preferred sources or homepage filters, we dont send request
        if(source !== 'The New York Times' && source !== '' && !sources.includes('The New York Times')) return Promise.resolve({})
        let query = ''

        //if user searched for news, we ignore the user's preferences and all other filters to have a more accurate search
        if (search) {
            query += `?q=${search}&page=${page}&api-key=${import.meta.env.VITE_NYT_API_KEY}&show-fields=byline`
        } else {
            query += `?page=${page}&api-key=${import.meta.env.VITE_NYT_API_KEY}&show-fields=byline`

            if(dateRange.first_date) {
                query += `&begin_date=${dateRange.first_date}&end_date=${dateRange.last_date}`
            }
            if(category !== '') {
                query += `&fq=news_desk:("${category}")`
            } else if(categories.length > 0) {
                query += `&fq=news_desk:("${categories.join('","')}")`
            }

        }
        
        const response = await fetch(`${NYTAPI_URL}${query}`);
        return response.json();
    }
)

export const getGuardianApiQuery = createAsyncThunk(
    'getGuardianApiQuery',
    async ({newsFilters, userFilters}: {newsFilters: NewsStateType['newsFilters'], userFilters: NewsStateType['userFilters']}) => {

        let {category, page, pageSize, source, search, dateRange} = newsFilters
        let {sources, categories, authors} = userFilters

        //if user doesnt include The Guardian in his preferred sources or homepage filters, we dont send request
        if(source !== 'The Guardian' && source !== '' && !sources.includes('The Guardian')) return Promise.resolve({})
        let query = ''

        //if user searched for news, we ignore the user's preferences and all other filters to have a more accurate search
        if(search) {
            query += `?q=${search}&page=${page}&page-size=${pageSize}&api-key=${import.meta.env.VITE_GUARDIAN_API_KEY}&show-fields=byline`
        } else {
            query = `?page=${page}&page-size=${pageSize}&api-key=${import.meta.env.VITE_GUARDIAN_API_KEY}&show-fields=byline`

            if(dateRange.first_date) {
                query += `&from-date=${dateRange.first_date}&to-date=${dateRange.last_date}`
            }
    
            //guardian api does accept these 2 categories as sport and healthcare-network
            if(category !== '') {
                switch(category) {
                    case 'Sports':
                        category = 'sport'
                        break;
                    case 'Health':
                        category = 'healthcare-network'
                        break;
                    default:
                        category = category.toLowerCase()
                        break;
                }
    
                query += `&section=${category.toLowerCase()}`
            }
            //if user choosed category from homepage, we ignore the user's preferred categories. that's why "else if"
            else if(categories.length > 0) {
                query += `&section=${categories.join('|')}`
                query = query.replace('Sports', 'sport').replace('Health', 'healthcare-network')
            }

            if(authors.length > 0) {
                query += `&byline=${authors.join('|')}`
            }
        }

        const response = await fetch(`${GUARDIANAPI_URL}${query}`);
        return response.json();
    }
)

export const getSourcesFromNewsApi = createAsyncThunk(
    'getSourcesFromNewsApi',
    async () => {
        const response = await fetch(`${NEWSAPI_URL}sources?apiKey=${import.meta.env.VITE_NEWSAPI_API_KEY}`);
        return response.json();
    }
)