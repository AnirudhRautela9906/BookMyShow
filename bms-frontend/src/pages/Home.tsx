import BannerSlider from '@/components/shared/BannerSlider';
import { Suspense } from 'react';

const Home = () => {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <BannerSlider />
      </Suspense>
    </>
  );
};

export default Home;
