import { IEnvironment } from './enivronment.interface';

export const environment: IEnvironment = {
  production: false,
  backendUrl: 'http://localhost:3000/api',
  mongoUrl: 'mongodb://localhost:27017'
};
