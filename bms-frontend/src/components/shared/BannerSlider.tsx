import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import type { Movie } from '@/types';

const animation = { duration: 10000, easing: (t: number) => t };

const BannerSlider = ({ movies }: { movies: Movie[] }) => {
  const [isPaused, setIsPaused] = useState(false);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: 'free',
    slides: {
      perView: 3,
      spacing: 15,
    },
    renderMode: 'performance',
    drag: false,

    created(s) {
      if (!isPaused) {
        s.moveToIdx(5, true, animation);
      }
    },

    updated(s) {
      if (!isPaused) {
        s.moveToIdx(s.track.details.abs + 5, true, animation);
      }
    },

    animationEnded(s) {
      if (!isPaused) {
        s.moveToIdx(s.track.details.abs + 5, true, animation);
      }
    },
  });

  const pause = () => {
    setIsPaused(true);
    slider.current?.animator.stop();
  };

  const play = () => {
    setIsPaused(false);
    slider.current?.moveToIdx(
      slider.current.track.details.abs + 5,
      true,
      animation
    );
  };

  return (
    <div className='bg-white py-6'>
      <div className='mx-auto px-4'>
        <div
          ref={sliderRef}
          className='keen-slider'
          onMouseEnter={pause} // 🛑 pause on hover
          onMouseLeave={play} // ▶️ resume on leave
          onTouchStart={pause} // 📱 pause on touch
          onTouchEnd={play} // 📱 resume after touch
        >
          {movies.map(movie => (
            <div key={movie?.id} className='keen-slider__slide'>
              <img
                src={movie?.banner}
                className='h-65 w-full rounded-xl object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
