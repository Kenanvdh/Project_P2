import { IEnvironment } from './enivronment.interface';


export const environment: IEnvironment = {
  production: true,
  backendUrl: 'https://project-cswf.azurewebsites.net/api',
  mongoUrl: 'mongodb+srv://kdmvanderheijden:Kvdh2197280@cswf-project.pbezebm.mongodb.net/',
  neo4j: {
    scheme: 'neo4j',
    host: 'localhost',
    password: 'Kvdh2197280!',
    username: 'neo4j',
    database: 'neo4j',
    port: 7687
  }
};