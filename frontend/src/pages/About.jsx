import { motion } from 'framer-motion';
import { HiCheckCircle, HiAcademicCap, HiUserGroup, HiHeart, HiLightBulb } from 'react-icons/hi';

const AboutPage = () => {
  const values = [
    {
      icon: HiAcademicCap,
      title: 'Academic Excellence',
      description: 'Commitment to the highest standards of education and intellectual growth.',
    },
    {
      icon: HiUserGroup,
      title: 'Community',
      description: 'Building a supportive community of learners, educators, and professionals.',
    },
    {
      icon: HiHeart,
      title: 'Integrity',
      description: 'Upholding ethical values and honesty in all our endeavors.',
    },
    {
      icon: HiLightBulb,
      title: 'Innovation',
      description: 'Embracing new ideas and modern approaches to education.',
    },
  ];

  const milestones = [
    { year: '1999', event: 'Campus Established' },
    { year: '2005', event: 'First Batch Graduated' },
    { year: '2010', event: 'New Building Inaugurated' },
    { year: '2015', event: 'Digital Library Launched' },
    { year: '2020', event: 'E-Learning Platform Started' },
    { year: '2024', event: '25 Years of Excellence' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 gradient-hero text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 rounded-full bg-white/20 text-sm font-semibold mb-4"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-xl mb-6"
          >
            Our Story & Mission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Building future business leaders with knowledge, values, and skills since 1999.
          </motion.p>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg text-gray-900 mb-6">
                A Legacy of <span className="text-primary-600">Excellence</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                SVCM Campus was established in 1999 with a vision to provide quality business 
                education accessible to all. Under the affiliation of Tribhuvan University, 
                we have grown to become one of the leading institutions for Bachelor of Business 
                Studies (BBS) in Nepal.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Over the years, we have produced thousands of successful graduates who are 
                now serving in various sectors of the economy, from banking and finance to 
                entrepreneurship and public service.
              </p>
              <div className="space-y-3">
                {[
                  'Tribhuvan University Affiliated',
                  'UGC Recognized Institution',
                  'Experienced Faculty Members',
                  'Modern Infrastructure',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <HiCheckCircle className="text-primary-500 text-xl" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Graduation ceremony"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent-500 rounded-2xl p-6 text-primary-900 shadow-xl">
                <div className="text-4xl font-bold">25+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide quality business education that empowers students with knowledge, 
                skills, and values necessary to excel in the ever-changing global business 
                environment while contributing positively to society.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mb-6">
                <span className="text-3xl">👁️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be recognized as a center of excellence in business education, producing 
                ethically responsible and globally competitive business professionals who 
                drive positive change in organizations and communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg">
              The principles that guide everything we do at SVCM Campus.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-3xl text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding gradient-hero text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Our Journey</h2>
            <p className="text-gray-300 text-lg">Key milestones in our history</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary-600 -translate-x-1/2 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="inline-block glass rounded-2xl p-6">
                      <div className="text-accent-400 text-2xl font-bold mb-1">{milestone.year}</div>
                      <div className="text-white">{milestone.event}</div>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-accent-400 relative z-10 hidden md:block" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-lg text-gray-900 mb-4">Principal's Message</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Principal"
                  className="rounded-3xl shadow-lg mx-auto"
                />
                <div className="text-center mt-4">
                  <h4 className="font-bold text-gray-900">Prof. Dr. Ram Shrestha</h4>
                  <p className="text-gray-500 text-sm">Campus Chief</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="text-6xl text-primary-200 font-serif mb-4">"</div>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Welcome to SVCM Campus! Education is not just about acquiring knowledge; 
                  it's about developing character, building skills, and nurturing dreams. 
                  At SVCM, we are committed to providing an environment where every student 
                  can discover their potential and work towards becoming responsible citizens 
                  and successful professionals.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our dedicated faculty, modern infrastructure, and industry-focused curriculum 
                  ensure that our students are well-prepared for the challenges of the business world. 
                  I invite you to be a part of our growing family and embark on a journey of 
                  learning, growth, and success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
