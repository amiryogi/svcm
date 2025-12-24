import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Blog from './models/Blog.js';
import Notice from './models/Notice.js';
import Admission from './models/Admission.js';
import Page from './models/Page.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Blog.deleteMany();
    await Notice.deleteMany();
    await Admission.deleteMany();
    await Page.deleteMany();
    console.log('🗑️ Existing data cleared.');

    // Seed User
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@svcm.edu.np',
      password: 'Admin@123',
      role: 'admin',
      isActive: true
    });
    console.log('👤 Admin user seeded.');

    // Seed Pages
    await Page.create([
      {
        title: 'Mission & Vision',
        slug: 'mission-vision',
        content: 'Our mission is to provide quality education to students from all walks of life. We envision a society where every individual has access to knowledge and opportunities.',
        isPublished: true,
        order: 1
      },
      {
        title: 'Academic Programs',
        slug: 'academic-programs',
        content: 'We offer a variety of programs including BBS, MBS, and other professional courses. Our curriculum is designed to meet the needs of the modern industry.',
        isPublished: true,
        order: 2
      }
    ]);
    console.log('📄 Pages seeded.');

    // Seed Notices
    await Notice.create([
      {
        title: 'Admission Open for 2026',
        content: 'Admissions are now open for the 2026 academic session. Interested students can apply online through our portal.',
        isActive: true,
        isHighlight: true,
        priority: 1
      },
      {
        title: 'Winter Vacation Announcement',
        content: 'The campus will remain closed for winter vacation from Jan 1st to Jan 15th.',
        isActive: true,
        isHighlight: false,
        priority: 2
      }
    ]);
    console.log('📢 Notices seeded.');

    // Seed Blogs
    await Blog.create([
      {
        title: 'Benefits of Studying BBS at SVCM',
        slug: 'benefits-of-studying-bbs',
        content: 'Studying BBS at SVCM provides students with a strong foundation in business principles and practical experience.',
        author: admin._id,
        category: 'academic',
        isPublished: true
      },
      {
        title: 'How to Prepare for Exams',
        slug: 'exam-preparation-tips',
        content: 'Effective exam preparation requires a disciplined approach and time management.',
        author: admin._id,
        category: 'news',
        isPublished: true
      }
    ]);
    console.log('📝 Blogs seeded.');

    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
