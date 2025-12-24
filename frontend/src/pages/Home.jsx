import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Features from '../components/home/Features';
import Programs from '../components/home/Programs';
import Activities from '../components/home/Activities';
import Facilities from '../components/home/Facilities';
import Events from '../components/home/Events';
import Testimonials from '../components/home/Testimonials';
import WelcomeModal from '../components/WelcomeModal';

const Home = () => {
  return (
    <>
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
