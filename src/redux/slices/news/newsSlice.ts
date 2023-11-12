import { createSlice } from "@reduxjs/toolkit";
import { GuardianApiResponseType, NewsApiResponseType, NewsItem, NewsStateType, NytApiResponseType, SourceItem } from "../../../types/news";
import { 
    getGuardianApiQuery, 
    getNYTApiQuery, 
    getNewsApiQuery,
    getSourcesFromNewsApi,
} from "./action";

const initialNewsFiltersState: NewsStateType['newsFilters'] = {
    page: 1,
    pageSize: 12,
    category: '',
    search: '',
    dateRange: {
        first_date: null,
        last_date: null
    },
    source: '',
}

const initialUserFiltersState: NewsStateType['userFilters'] = {
    sources: [],
    categories: [],
    authors: []
}

export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        newsFilters: initialNewsFiltersState,
        userFilters: initialUserFiltersState,
        news: [] as NewsItem[],
        sources: [] as SourceItem[],
        sourcesLoading: false,
        guardianApiLoading: false,
        nytApiLoading: false,
        newsApiLoading: false,
        selectedNews: {} as NewsItem,
    },
    reducers: {
        setNewsFilter: (state, { payload }) => {
            if (Object.keys(payload).length > 0) {
                Object.keys(payload).forEach((key: string) => {
                    state.newsFilters[key as keyof NewsStateType['newsFilters']] = payload[key as keyof typeof payload] as never;
                });
            } else {
                state.newsFilters = initialNewsFiltersState;
            }
        },
        setNews: (state, { payload }) => {
            state.news = payload;
        },
        setSources: (state, { payload }) => {
            state.sources = payload;
        },
        setUserNewsFilters: (state, { payload }) => {
            if(Object.keys(payload).length > 0) {
                Object.keys(payload).forEach((key: string) => {
                    state.userFilters[key as keyof NewsStateType['userFilters']] = payload[key];
                })
            } else {
                state.userFilters = initialUserFiltersState;
            }
        },
        setSelectedNews: (state, { payload }) => {
            state.selectedNews = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNewsApiQuery.fulfilled, (state, {payload}) => {
                state.newsApiLoading = false
                let newNews = [] as NewsItem[]
                payload.articles?.map((news: NewsApiResponseType) => (
                    newNews.push({
                        title: news.title,
                        content: news.description,
                        image: news.urlToImage,
                        source: news.source.name,
                        timestamp: news.publishedAt,
                        url: news.url
                })));
                state.news = [...state.news, ...newNews]
            })
            .addCase(getNewsApiQuery.pending, (state) => {
                state.newsApiLoading = true
            })
            .addCase(getNewsApiQuery.rejected, (state) => {
                state.newsApiLoading = false
            })
            .addCase(getGuardianApiQuery.pending, (state) => {
                state.guardianApiLoading = true
            })
            .addCase(getGuardianApiQuery.fulfilled, (state, { payload }) => {
                state.guardianApiLoading = false
                let newNews = [] as NewsItem[]
                payload.response?.results?.map((news: GuardianApiResponseType) => (
                    newNews.push(
                        {
                            title: news.webTitle,
                            content: news.webTitle,
                            image: '/the_guardian_logo.svg',
                            source: 'The Guardian',
                            timestamp: news.webPublicationDate,
                            author: news?.fields?.byline,
                            category: news?.sectionName,
                            url: news.webUrl
                          }
                    )
                ));
                state.news = [...state.news, ...newNews]
            })
            .addCase(getGuardianApiQuery.rejected, (state) => {
                state.guardianApiLoading = false
            })
            .addCase(getNYTApiQuery.pending, (state) => {
                state.nytApiLoading = true
            })
            .addCase(getNYTApiQuery.fulfilled, (state, { payload }) => {
                state.nytApiLoading = false
                let newNews = [] as NewsItem[]
                payload.response?.docs?.map((news: NytApiResponseType) => (
                    newNews.push(
                        {
                            title: news?.headline?.main,
                            content: news?.abstract,
                            image: news.multimedia?.find((image: any) => image?.subtype === 'hpSmall') ? `https://www.nytimes.com/${news.multimedia?.find((image: any) => image?.subtype === 'largeHorizontal375')?.url}` : news.multimedia[0]?.url ? `https://www.nytimes.com/${news.multimedia[0]?.url}` : '/NewYorkTimes.svg',
                            source: news?.source ? news.source : 'The New York Times',
                            timestamp: news.pub_date,
                            author: news?.byline?.person[0]?.firstname + ' ' + news?.byline?.person[0]?.lastname,
                            category: news?.news_desk,
                            url: news.web_url
                        }
                    )
                ));
                state.news = [...state.news, ...newNews]
            })
            .addCase(getNYTApiQuery.rejected, (state) => {
                state.nytApiLoading = false
            })
            .addCase(getSourcesFromNewsApi.pending, (state) => {
                state.sourcesLoading = true
            })
            .addCase(getSourcesFromNewsApi.fulfilled, (state, { payload }) => {
                state.sourcesLoading = false
                state.sources = payload.sources.map((source: SourceItem) => ({
                    id: source.id,
                    name: source.name
                }))
                state.sources = [...state.sources, {id: 'The Guardian', name: 'The Guardian'}, {id: 'The New York Times', name: 'The New York Times'}]
            })
}})

export const { 
    setNewsFilter, 
    setNews, 
    setSources, 
    setUserNewsFilters,
    setSelectedNews
} = newsSlice.actions