import { gql } from 'apollo-server-express';

export const SearchMovieItem = gql`
  type SearchMovieItem @cacheControl(maxAge: 86400) {
    externalId: Int!
    title: String
    images: Images!
    popularity: Float
    vote_average: Float
    overview: String!
    genre_ids: [Int]
    original_language: String
    vote_count: Int
    adult: Boolean
    release_date: String
    original_title: String
    video: Boolean
  }
`;

export const SearchSerieItem = gql`
  type SearchSerieItem {
    externalId: Int!
    title: String!
    images: Images!
    popularity: Float
    vote_average: Float
    overview: String!
    genre_ids: [Int]
    original_language: String
    vote_count: Int
    first_air_date: String
    origin_country: [String]
  }
`;

export const ItemInterface = gql`
  interface ItemInterface {
    id: ID!
    externalId: Int!
    title: String!
    genres: [Genre]
    overview: String!
    popularity: Float
    vote_count: Int
    vote_average: Float
    images: Images!
  }
`;

export const Movie = gql`
  type Movie implements ItemInterface @cacheControl(maxAge: 86400) {
    id: ID!
    externalId: Int!
    title: String!
    genres: [Genre]
    overview: String!
    popularity: Float
    vote_count: Int
    vote_average: Float
    images: Images!
    imdb_id: String
    original_title: String!
    release_date: String
    video: Boolean
    images: Images!
    videoData: [VideoData]
    omdbData: FilmOMDBData
  }
`;

export const Serie = gql`
  type Serie implements ItemInterface @cacheControl(maxAge: 86400) {
    id: ID!
    externalId: Int!
    title: String!
    genres: [Genre]
    overview: String!
    popularity: Float
    vote_count: Int
    vote_average: Float
    images: Images!
    name: String!
    original_name: String
    number_of_episodes: Int
    number_of_seasons: Int
    seasons: [Season]
    videoData: [VideoData]
    omdbData: SerieOMDBData
  }
`;
export const VideoData = gql`
  type VideoData @cacheControl(maxAge: 86400) {
    id: String
    iso_639_1: String
    iso_3166_1: String
    key: String
    name: String
    site: String
    size: Int
    type: String
    trailer: String
  }
`;
export const Season = gql`
  type Season {
    id: Int
    air_date: String
    episode_count: Int
    poster_path: String
    season_number: Int
  }
`;
export const Genre = gql`
  type Genre {
    id: Int!
    name: String
  }
`;

export const Images = gql`
  type Images {
    small: ImagesData
    medium: ImagesData
    large: ImagesData
  }
`;

export const ImagesData = gql`
  type ImagesData {
    main: String!
    secondary: String!
  }
`;
