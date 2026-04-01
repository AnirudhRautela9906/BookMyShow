import Recommended from '@/components/Recommended';
import BannerSlider from '@/components/shared/BannerSlider';
import type { Movie, MoviesResponse } from '@/types';
import { Suspense, use } from 'react';

const fetchMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_REACT_TMDB_API_KEY}`
  );
  const data: MoviesResponse = await res.json();
  return data.results.map(i => ({
    ...i,
    banner: 'https://image.tmdb.org/t/p/original' + i.backdrop_path,
    poster: 'https://image.tmdb.org/t/p/original' + i.poster_path,
  }));
};

const moviesPromise = fetchMovies();
const Home = () => {
  const movies: Movie[] = use(moviesPromise);
  console.log(movies);
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <BannerSlider movies={movies} />
        <Recommended movies={movies} />
      </Suspense>
    </>
  );
};

export default Home;
