const ENV = process.env.EXPO_PUBLIC_ENV || 'local';

const config = {
  local: {
    baseURL: 'https://clihost-work1nw.sliplane.app',
    leetcodeAPI: 'https://clihost-work1nw.sliplane.app'
  },
  production: {
    baseURL: 'https://leetcoderx.onrender.com',
    leetcodeAPI: 'https://leetcdtasker.onrender.com'
  }
};

console.log('[API Config] Environment:', ENV);
console.log('[API Config] API_BASE_URL:', config[ENV].baseURL);
console.log('[API Config] LEETCODE_API_URL:', config[ENV].leetcodeAPI);

export const API_BASE_URL = config[ENV].baseURL;
export const LEETCODE_API_URL = config[ENV].leetcodeAPI;
export const API_ENV = ENV;
