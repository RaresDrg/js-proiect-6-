import axios from 'axios';

export async function fetchMovies(page, itemsPerPage) {
  const apiKey = '051a3d8a53317eb2948f5da4b81e4296';
  const apiUrl = 'https://api.themoviedb.org/3/trending/movie/week';

  try {
    const response = await axios.get(apiUrl, {
      params: {
        api_key: apiKey,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}
