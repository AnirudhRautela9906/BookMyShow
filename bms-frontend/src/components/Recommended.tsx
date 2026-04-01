import type { Movie } from '@/types';

const Recommended = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className='w-full py-6 bg-white'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='items-center flex justify-between mb-4'>
          <h2 className='text-2x1 font-semibold'>Recommende Movies</h2>
          <span className='text-md text-red-500 cursor-pointer hover:underline font-medium'>
            See All
          </span>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {movies.slice(0, 5).map(movie => (
            <div
              key={movie?.id}
              className='rounded overflow-hidden cursor-pointer'
            >
              <div className='relative'>
                <img
                  src={movie?.poster}
                  alt=''
                  className='w-full h-75 object-cover rounded'
                />
              </div>
              <div className='bg-black text-white text-sm px-2 py-1 flex items-center justify-between'>
                <span> {movie.popularity}</span>
                <span>{movie.vote_count} Votes</span>
              </div>
              <div className='px-2 py-1'>
                <h3 className='font-semibold text-lg'>{movie.title}</h3>
                <p className='text-md text-gray-500'></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommended;
