const ENV = process.env.EXPO_PUBLIC_ENV || 'local';

const config = {
  local: {
    baseURL: 'http://localhost:3001',
    leetcodeAPI: 'http://localhost:3001'
  },
  production: {
    baseURL: 'https://leetcoderx.onrender.com',
    leetcodeAPI: 'https://leetcdtasker.onrender.com'
  }
};

export const API_BASE_URL = config[ENV].baseURL;
export const LEETCODE_API_URL = config[ENV].leetcodeAPI;
export const API_ENV = ENV;
