export const BACKDROP_BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
export const POSTER_BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';

export const SMALL_BACKDROP_SIZE = 'w300';
export const MEDIUM_BACKDROP_SIZE = 'w780';
export const LARGE_BACKDROP_SIZE = 'w1280';

export const SMALL_POSTER_SIZE = 'w92';
export const MEDIUM_POSTER_SIZE = 'w500';
export const LARGE_POSTER_SIZE = 'w780';

export const normalizeItemData = ({
  poster_path,
  backdrop_path,
  id,
  ...rest
}) => ({
  ...rest,
  externalId: id,
  images: {
    small: {
      main: `${POSTER_BASE_IMAGE_URL}${SMALL_POSTER_SIZE}/${poster_path}`,
      secondary: `${BACKDROP_BASE_IMAGE_URL}${SMALL_BACKDROP_SIZE}/${backdrop_path}`
    },
    medium: {
      main: `${POSTER_BASE_IMAGE_URL}${MEDIUM_POSTER_SIZE}/${poster_path}`,
      secondary: `${BACKDROP_BASE_IMAGE_URL}${MEDIUM_BACKDROP_SIZE}/${backdrop_path}`
    },
    large: {
      main: `${POSTER_BASE_IMAGE_URL}${LARGE_POSTER_SIZE}/${poster_path}`,
      secondary: `${BACKDROP_BASE_IMAGE_URL}${LARGE_BACKDROP_SIZE}/${backdrop_path}`
    }
  }
});

export const normalizeTVData = ({
  poster_path,
  backdrop_path,
  id,
  name,
  ...rest
}) => ({
  ...rest,
  externalId: id,
  title: name,
  images: {
    small: {
      main: `${POSTER_BASE_IMAGE_URL}${SMALL_POSTER_SIZE}/${poster_path}`,
      secondary: `${BACKDROP_BASE_IMAGE_URL}${SMALL_BACKDROP_SIZE}/${backdrop_path}`
    },
    medium: {
      main: `${POSTER_BASE_IMAGE_URL}${MEDIUM_POSTER_SIZE}/${poster_path}`,
      secondary: `${BACKDROP_BASE_IMAGE_URL}${MEDIUM_BACKDROP_SIZE}/${backdrop_path}`
    },
    large: {
      main: `${POSTER_BASE_IMAGE_URL}${LARGE_POSTER_SIZE}/${poster_path}`,
      secondary: `${BACKDROP_BASE_IMAGE_URL}${LARGE_BACKDROP_SIZE}/${backdrop_path}`
    }
  }
});
export const transformFilmData = list =>
  list.results ? list.results.map(normalizeItemData) : [];

export const transformSerieData = list =>
  list.results ? list.results.map(normalizeTVData) : [];

export const normalizeVideoData = data => ({
  ...data,
  trailer:
    data.site === 'YouTube' && data.type === 'Trailer'
      ? `https://www.youtube.com/watch?v=${data.key}`
      : null
});

export const transformVideoData = list =>
  list.results
    ? list.results.map(data => ({
        id: list.id,
        ...normalizeVideoData(data)
      }))
    : [];
