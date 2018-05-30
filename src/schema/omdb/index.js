export const Rating = `
    type Rating @cacheControl(maxAge: 5){
        Source: String
        Value:String
    }
`
export const FilmOMDB = `
    type FilmOMDB {
        Title: String
        Year: String
        Rated: String
        Released: String
        Runtime: String
        Genre: String
        Director: String
        Writer: String
        Actors: String
        Plot: String
        Language: String
        Country: String
        Awards: String
        Poster: String
        Ratings: [Rating]
        Metascore: String
        imdbRating: Float
        imdbVotes: Int
        imdbID: String
        Type: String
        DVD: String
        BoxOffice: String
        Production: String
        Website: String
        Response: Boolean
    }
`

export const SerieOMDB = `
    type SerieOMDB @cacheControl(maxAge: 5){  
        Title: String
        Year: String
        Rated: String
        Released: String
        Runtime: String
        Genre: String
        Director: String
        Writer: String
        Actors: String
        Plot: String
        Language: String
        Country: String
        Awards: String
        Poster: String
        Ratings: [Rating]
        Metascore: String
        imdbRating: Float
        imdbVotes: Int
        imdbID: String
        Type: String
        totalSeasons: Int
        Response: Boolean
    }
`