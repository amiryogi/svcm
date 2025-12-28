import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
  const siteTitle = 'SVCM Campus - TU Affiliated BBS College';
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | Nepal`;
  const defaultDescription = 'SVCM Campus - Premier TU Affiliated BBS College in Nepal. Quality education in Bachelor of Business Studies with experienced faculty and modern facilities.';
  const siteUrl = window.location.origin;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={`${siteUrl}${url || ''}`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Canonical Link */}
      <link rel="canonical" href={`${siteUrl}${url || ''}`} />
    </Helmet>
  );
};

export default SEO;
