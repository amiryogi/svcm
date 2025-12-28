import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Features from '../components/home/Features';
import Programs from '../components/home/Programs';
import Activities from '../components/home/Activities';
import Facilities from '../components/home/Facilities';
import Events from '../components/home/Events';
import Testimonials from '../components/home/Testimonials';
import WelcomeModal from '../components/WelcomeModal';
import SEO from '../components/common/SEO';

const Home = () => {
  return (
    <>
      <SEO 
        title="Home" 
        description="Welcome to SVCM Campus, the premier TU affiliated college for Bachelor of Business Studies (BBS) in Nepal." 
      />
      <WelcomeModal />
      <Hero />
      <About />
      <Features />
      <Programs />
      <Activities />
      <Facilities />
      <Events />
      <Testimonials />
    </>
  );
};

export default Home;
