export interface IEnvironment {
    production: boolean;
    backendUrl: string;
    mongoUrl: string;
    neo4j: {
        scheme: string;
        host: string;
        password: string;
        username: string;
        database: string;
        port: number;
    };
}