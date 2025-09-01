import { Fragment } from 'react';
import Hero from '../components/Hero';
import CustomPerfumeDeal from '../components/CustomPerfumeDeal';
import FAQ from '../components/FAQ';
import bilmaLogo from '../assets/images/bilma-scents-logo.png';
import HomeCarousel from '../components/HomeCarousel';
import { usePerfumes } from '../contexts/PerfumeContext';

const Home = () => {
  const { perfumes } = usePerfumes();

  const getSectionPerfumes = (section) =>
    perfumes.filter((p) => p.sections?.includes(section));

  return (
    <Fragment>
      <div
        style={{
          backgroundColor: '#f1e7dd',
          backgroundImage: `url(${bilmaLogo})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '40vw',
        }}>
        <Hero />
        {/* <HomeCarousel /> */}
        <CustomPerfumeDeal
          title="New Arrivals"
          perfumes={getSectionPerfumes('New Arrivals')}
        />
        <CustomPerfumeDeal
          title="Best Sellers"
          perfumes={getSectionPerfumes('Best Sellers')}
        />
        <CustomPerfumeDeal
          title="For Him"
          perfumes={getSectionPerfumes('For Him')}
        />
        <CustomPerfumeDeal
          title="For Her"
          perfumes={getSectionPerfumes('For Her')}
        />
        <CustomPerfumeDeal
          title="Luxury Collection"
          perfumes={getSectionPerfumes('Luxury Collection')}
        />
        <CustomPerfumeDeal
          title="Customer Favorites"
          perfumes={getSectionPerfumes('Customer Favorites')}
        />
        <FAQ />
      </div>
    </Fragment>
  );
};

export default Home;
