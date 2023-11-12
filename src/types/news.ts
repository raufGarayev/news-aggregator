export type NewsStateType = {
    news: [];
    sources: [];
    newsFilters: {
        page: number;
        pageSize: number;
        category: string;
        search: string;
        dateRange: {
            first_date: string | null;
            last_date: string | null;
        },
        source: string
    };
    userFilters: {
        sources: string[];
        categories: string[];
        authors: string[];
    }
}

export type NewsItem = {
    title: string;
    content: string;
    image: string;
    source: string;
    timestamp: string;
    author?: string;
    category?: string;
    url?: string;
}

export type SourceItem = {
    id: string;
    name: string;
}

export type NewsApiResponseType = {
    title: string;
    description: string;
    urlToImage: string;
    source: {
        name: string;
    };
    publishedAt: string;
    url: string;
}

export type GuardianApiResponseType = {
    webTitle: string;
    fields: {
        byline: string;
    };
    webPublicationDate: string;
    sectionName: string;
    webUrl: string;
}

export type NytApiResponseType = {
    headline: {
        main: string;
    };
    abstract: string;
    multimedia: {
        url: string;
    }[];
    pub_date: string;
    byline: {
        person: any[];
    };
    source: string;
    news_desk: string;
    web_url: string;
}