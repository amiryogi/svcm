import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

const testAPI = async () => {
  console.log('🚀 Starting API Audit...');
  
  const endpoints = [
    { name: 'Blogs (Public)', url: '/blogs' },
    { name: 'Notices (Public)', url: '/notices' },
    { name: 'Pages (Public)', url: '/pages' },
    { name: 'Admin Dashboard Info', url: '/auth/me', protected: true },
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`\nTesting ${endpoint.name}...`);
      const response = await axios.get(`${API_URL}${endpoint.url}`);
      console.log(`✅ ${endpoint.name} returned status ${response.status}`);
      if (response.data.data) {
        console.log(`   Count: ${response.data.data.length || '1'}`);
      }
    } catch (error) {
      if (endpoint.protected && error.response?.status === 401) {
        console.log(`✅ ${endpoint.name} correctly blocked unauthorized access (401)`);
      } else {
        console.error(`❌ ${endpoint.name} failed with status ${error.response?.status || 'UNKNOWN'}`);
        console.error(`   Error message: ${error.message}`);
      }
    }
  }

  console.log('\n✨ API Audit Complete!');
};

testAPI();
