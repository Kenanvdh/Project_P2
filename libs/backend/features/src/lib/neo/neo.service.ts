import { Injectable, Logger } from '@nestjs/common';
import { IArtist, IList, ISong } from '@indivproj-p2/shared/api';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class NeoService {
  TAG = 'NeoService';
  private logger = new Logger(this.TAG);

  constructor(private readonly neoService: Neo4jService) {}

  addOrUpdateSong(song: ISong) {
    this.logger.log('addSong');

    this.neoService.write(
      `MERGE (s:Song {id: "${song.id}", name: "${song.name}", album: "${song.album}"})
            MERGE (a:Artist {id: "${song.artist.id}", name: "${song.artist.name}"})
            MERGE (a)-[:PERFORMED]->(s)`
    );
  }

  async recommend(id: string) {
    this.logger.log('recommend');
    // Query Neo4j to get recommended lists
    const neoResult = await this.neoService.read(
      `MATCH (inputList:List{id: "${id}"})-[:CONTAINS]->(song:Song)<-[:CONTAINS]-(recommendedList:List)
      WITH recommendedList, COLLECT(DISTINCT song) AS basedSongs
      RETURN recommendedList, basedSongs`
    );

    const recommendedList = neoResult.records.map((record) => {
      const recommendedList = record.get('recommendedList');
      const basedSongs = record.get('basedSongs');

      const list: Partial<IList> = {
        id: recommendedList.properties.id,
        name: recommendedList.properties.name,
        songs: basedSongs.map((song: any) => ({  
          id: song.properties.id,
          name: song.properties.name,
          album: song.properties.album,
        }))
      };

      return list as IList;
    });

    return recommendedList;
  }

  addOrUpdateList(list: IList) {
    this.logger.log('addList');

    // First, delete all previous relations of the list with songs
    this.neoService.write(
      `MATCH (l:List {id: "${list.id}"})-[r:CONTAINS]->(s:Song)<-[p:PERFORMED]-(a:Artist) DELETE r, p`
    );

    // Then add or update the list and its relations with songs and artists
    const queries = list.songs.map((song) => {
      const query = `MERGE (s:Song {id: "${song.id}", name: "${song.name}", album: "${song.album}"})
       MERGE (a:Artist {id: "${song.artist.id}", name: "${song.artist.name}"})   
       MERGE (a)-[:PERFORMED]->(s)
       MERGE (l:List {id: "${list.id}", name: "${list.name}"})
       MERGE (l)-[:CONTAINS]->(s)`;
      this.neoService.write(query);
    });
  }

  addOrUpdateArtist(artist: IArtist) {
    this.logger.log('addArtist');
    this.neoService.write(
      `MERGE (a:Artist {id: "${artist.id}", name: "${artist.name}"})`
    );
  }

  addSongToArtist(song: ISong, artist: IArtist) {
    this.logger.log('addSongToArtist');
    this.neoService.write(
      `MATCH (s:Song {id: "${song.id}"}), (a:Artist {id: "${artist.id}"}) MERGE (a)-[:PERFORMED]->(s)`
    );
  }

  addSongToList(song: ISong, list: IList) {
    this.logger.log('addSongToList');
    this.neoService.write(
      `MATCH (s:Song {id: "${song.id}"}), (l:List {id: "${list.id}"}) MERGE (l)-[:CONTAINS]->(s)`
    );
  }

  deleteSong(song: ISong) {
    this.logger.log('deleteSong');
    this.neoService.write(`MATCH (s:Song {id: "${song.id}"}) DETACH DELETE s`);
  }

  deleteList(list: IList) {
    this.logger.log('deleteList');
    this.neoService.write(`MATCH (l:List {id: "${list.id}"}) DETACH DELETE l`);
  }
}
