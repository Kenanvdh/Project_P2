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

  getListWithSongs(list: IList) {
    this.logger.log('getListWithSongs');
    return this.neoService.read(
      `MATCH (l:List {id: "${list.id}"})-[:CONTAINS]->(s:Song) RETURN s`
    );
  }

  getArtistWithSongs(artist: IArtist) {
    this.logger.log('getArtistWithSongs');
    return this.neoService.read(
      `MATCH (a:Artist {id: "${artist.id}"})-[:PERFORMED]->(s:Song) RETURN s`
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
