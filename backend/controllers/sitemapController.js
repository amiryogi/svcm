import Blog from '../models/Blog.js';
import Page from '../models/Page.js';

// @desc    Generate sitemap.xml
// @route   GET /api/sitemap.xml
// @access  Public
export const getSitemap = async (req, res, next) => {
  try {
    const baseUrl = process.env.SITE_URL || 'https://svcm.edu.np';
    
    const blogs = await Blog.find({ isPublished: true }).select('slug updatedAt');
    const pages = await Page.find({ isPublished: true }).select('slug updatedAt');
    
    const staticPaths = [
      '',
      '/about',
      '/programs',
      '/admission',
      '/blog',
      '/contact',
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static Paths
    staticPaths.forEach(path => {
      xml += `
  <url>
    <loc>${baseUrl}${path}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Dynamic Pages
    pages.forEach(page => {
      xml += `
  <url>
    <loc>${baseUrl}/page/${page.slug}</loc>
    <lastmod>${page.updatedAt.toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Dynamic Blogs
    blogs.forEach(blog => {
      xml += `
  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>
    <lastmod>${blog.updatedAt.toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    xml += '\n</urlset>';

    res.header('Content-Type', 'application/xml');
    res.status(200).send(xml);
  } catch (error) {
    next(error);
  }
};
