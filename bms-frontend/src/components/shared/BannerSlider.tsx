import { use } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
const fetchMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_REACT_TMDB_API_KEY}`
  );
  const data = await res.json();
  return data.results;
};
const moviesPromise = fetchMovies();
const animation = { duration: 5000, easing: (t: number) => t };
const BannerSlider = () => {
  const movies = use(moviesPromise);
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free',
    slides: {
      perView: 3,
      spacing: 15,
    },
    renderMode: 'performance',
    drag: false,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });
  return (
    <div className='bg-white py-6'>
      <div className='mx-auto px-4'>
        <div ref={sliderRef} className='keen-slider'>
          {movies.map((movie: any) => (
            <div key={movie?.id} className='keen-slider__slide'>
              <img
                src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                className='h-75 w-full rounded-xl object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
