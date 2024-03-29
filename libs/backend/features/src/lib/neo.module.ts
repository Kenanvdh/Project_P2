import { Neo4jModule, Neo4jScheme } from "nest-neo4j/dist";
import { NeoService } from "./neo/neo.service";
import { Module } from "@nestjs/common";
import { environment } from "@indivproj-p2/shared/util-env";

@Module({
    controllers: [],
    providers: [NeoService],
    imports: [
        Neo4jModule.forRoot({
            scheme: environment.neo4j.scheme as Neo4jScheme,
            host: environment.neo4j.host,
            password: environment.neo4j.password,
            username: environment.neo4j.username,
            database: environment.neo4j.database,
            port: environment.neo4j.port
        })
    ]
})
export class NeoModule {}