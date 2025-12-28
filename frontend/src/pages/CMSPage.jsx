import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageAPI } from '../services/api';
import Loader from '../components/common/Loader';
import SEO from '../components/common/SEO';

const CMSPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const response = await pageAPI.getBySlug(slug);
        setPage(response.data.data);
      } catch (err) {
        setError('Page not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  if (loading) return <Loader message="Loading page..." />;
  if (error || !page) {
    return (
      <div className="section-padding text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Page not found'}</h2>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <SEO 
        title={page.title} 
        description={page.metaDescription || page.content.substring(0, 160)} 
        image={page.featuredImage}
        url={`/page/${page.slug}`}
      />
      {/* Hero Section */}
      <section className="relative py-24 gradient-hero text-white">
        {page.featuredImage && (
          <div className="absolute inset-0 opacity-20">
            <img src={page.featuredImage} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-xl mb-6"
          >
            {page.title}
          </motion.h1>
          {page.metaDescription && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              {page.metaDescription}
            </motion.p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-4xl mx-auto text-gray-700 leading-relaxed"
          >
            {page.content.split('\n').map((para, i) => para.trim() && (
              <p key={i} className="mb-6">{para}</p>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CMSPage;
