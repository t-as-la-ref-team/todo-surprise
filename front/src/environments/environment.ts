import * as dotenv from 'dotenv';
//dotenv.config();

const port = process.env['FRONT_PORT'] || '3000';


export const environment = {
  production: true,
  weatherApiKey: '5ccad1686b1549b992d70017250602',
  apiBaseUrl: 'http://localhost:${port}/api'
};
