import * as envconfig from 'dotenv'

envconfig.config()

export const baseUrlTheMovieApi = process.env.URL_BASE_THE_MOVIE_API
export const baseUrlFavoriteApi = process.env.URL_BASE_FAVORITE_API
