export const SearchMovieItem = `
type SearchMovieItem {
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
  }`;

export const SearchSerieItem = `
  type SearchSerieItem {
    externalId: Int!
    title: String !
    images: Images!
    popularity: Float
    vote_average: Float
    overview: String!
    genre_ids: [Int]
    original_language: String
    vote_count: Int
    first_air_date: String
    origin_country: [String]
  }`;

export const ItemInterface = `interface ItemInterface {
    id: ID!
    externalId: Int!
    title: String!
    genres: [Genre]
    overview: String!
    popularity: Float
    vote_count: Int
    vote_average: Float
    images: Images!
  }`;

export const Movie = `
  type Movie implements ItemInterface{
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
  }`;

export const Serie = `
  type Serie implements ItemInterface @cacheControl(maxAge: 5){
    id: ID!
    externalId: Int!
    title: String!
    genres: [Genre]
    overview: String!
    popularity: Float
    vote_count: Int
    vote_average: Float
    images: Images!
    name: String !
    original_name: String
    number_of_episodes: Int
    number_of_seasons: Int
    seasons: [Season]
    videoData: [VideoData]
    omdbData: SerieOMDBData
  }`;
export const VideoData = `
  type VideoData @cacheControl(maxAge: 5){
    id: String
    iso_639_1: String
    iso_3166_1: String
    key: String
    name: String
    site: String
    size: Int
    type: String
    trailer: String
  }`;
export const Season = `
  type Season @cacheControl(maxAge: 5){
    id: Int
    air_date: String
    episode_count: Int
    poster_path: String
    season_number: Int
  }
  `;
export const Genre = `
  type Genre @cacheControl(maxAge: 5){
    id: Int!
    name: String
  }`;

export const Images = `
type Images @cacheControl(maxAge: 5){
    small: ImagesData
    medium: ImagesData
    large: ImagesData
}`;

export const ImagesData = `
type ImagesData @cacheControl(maxAge: 5){
    main: String!
    secondary: String!
}`;
