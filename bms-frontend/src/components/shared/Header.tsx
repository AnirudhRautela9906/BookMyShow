import reactLogo from '@/assets/react.svg';
import { FaSearch } from 'react-icons/fa';
const Header = () => {
  return (
    <div className='text-sm bg-white'>
      <div className='px-4 md:px-8'>
        <div className='max-w-7xl mx-auto flex justify-between items-center py-3'>
          <div className='flex items-center space-x-4'>
            <img
              src={reactLogo}
              className='h-8 object-contain cursor-pointer'
              alt=''
            />
            <div className='relative'>
              <input
                type='text'
                placeholder='Search for Movies'
                className='border border-gray-300  rounded px-4 py-1.5 w-100 text-sm outline-none'
              />
              <FaSearch className='absolute right-2 top-2.5 text-gray-500' />
            </div>
          </div>
          <div className='flex items-center space-x-6'>
            <div className='text-sm font-medium cursor-pointer mt-2'>India</div>
            <button className='bg-red-700 cursor-pointer text-white px-4 py-1.5 rounded text-sm'>
              Sign in
            </button>
          </div>
        </div>
      </div>
      <div className='bg-[#f2f2f2] px-4 md:px-4 '>
        <div className='max-w-7xl mx-auto flex justify-between items-center py-2 text-gray-700'>
          <div className='flex items-center space-x-6 font-medium'>
            {['Movies', 'Stream', 'Events', 'Plays', 'Sports', 'Activites'].map(
              i => (
                <span className='cursor-pointer hover:text-red-500'>{i}</span>
              )
            )}
          </div>
          <div className='flex items-center space-x-6 text-sm'>
            {['List Your Show', 'Corporates', 'Offers', 'Gift Cards'].map(i => (
              <span className='cursor-pointer hover:underline'>{i}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
