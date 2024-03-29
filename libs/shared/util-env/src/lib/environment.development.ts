import { IEnvironment } from './enivronment.interface';

export const environment: IEnvironment = {
  production: false,
  backendUrl: 'http://localhost:3000/api',
  mongoUrl: 'mongodb://localhost:27017',
  neo4j: {
    scheme: 'neo4j',
    host: 'localhost',
    password: 'Kvdh2197280!',
    username: 'neo4j',
    database: 'neo4j',
    port: 7473
  }
};
