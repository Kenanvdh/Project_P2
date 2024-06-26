import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Artist as ArtistModel, ArtistDocument } from './artist.schema';
import { Song as SongModel, SongDocument } from '../song/song.schema';
import { List as ListModel, ListDocument } from '../list/list.schema';
import { IArtist, ISong } from '@indivproj-p2/shared/api';
import { InjectModel } from '@nestjs/mongoose';
import { NeoService } from '../neo/neo.service';

@Injectable()
export class ArtistService {
  TAG = 'ArtistService';

  private readonly logger: Logger = new Logger(ArtistService.name);

  constructor(
    @InjectModel(ArtistModel.name) private artistModel: Model<ArtistDocument>,
    @InjectModel(SongModel.name) private songModel: Model<SongDocument>,
    @InjectModel(ListModel.name) private listModel: Model<ListDocument>,
    private readonly neoService: NeoService
  ) {}

  async getAll(): Promise<IArtist[]> {
    console.log(`Fetching all artists`);
    const items = await this.artistModel.find().exec();
    return items;
  }

  async getById(id: string): Promise<IArtist | null> {
    console.log(`Fetching artist with ID: ${id}`);
    const artist = await this.artistModel.findOne({ id }).exec();
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    
    return artist;
  }

  async create(artist: IArtist): Promise<IArtist> {
    console.log(`Creating artist with data: ${artist}`);

    const lastArtist = await this.artistModel
      .findOne()
      .sort({ _id: -1 })
      .exec();

    if (lastArtist) {
      artist.id = String(Number(lastArtist.id) + 2);
    } else {
      artist.id = '1';
    }

    const createdArtist = new this.artistModel(artist);
    this.neoService.addOrUpdateArtist(createdArtist);
    return createdArtist.save();
  }

  async update(id: string, artist: IArtist): Promise<IArtist | null> {
    console.log(`Updating artist with id ${id}`);

    const updatedArtist = await this.artistModel
      .findOneAndUpdate({ id }, artist, { new: true })
      .exec();

    if (!updatedArtist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    const updateResult = await this.songModel
      .updateMany(
        { 'artist.id': updatedArtist.id },
        { $set: { artist: updatedArtist } }
      )
      .exec();

    console.log(`Updated Artist in Songs: ${JSON.stringify(updateResult)}`);

    // Update the artist in lists
    const updateListResult = await this.listModel
      .updateMany(
        { 'songs.artist.id': updatedArtist.id },
        { $set: { 'songs.$.artist': updatedArtist } }
      )
      .exec();

    console.log(`Updated Artist in Lists: ${JSON.stringify(updateListResult)}`);
    console.log(`Updated Artist: ${JSON.stringify(updatedArtist)}`);
    console.log(`Song update result: ${JSON.stringify(updateResult)}`);

    this.neoService.addOrUpdateArtist(updatedArtist);
    return updatedArtist;
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting artist with ID: ${id}`);

    // Find the artist to be deleted
    const artistToDelete = await this.artistModel.findOne({ id }).exec();

    if (!artistToDelete) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    // Delete all songs associated with the artist from the song collection
    const deleteSongsResult = await this.songModel
      .deleteMany({ 'artist.id': id })
      .exec();
      
    // Update the lists by removing songs with the corresponding artist
    const updateListResult = await this.listModel
      .updateMany(
        { 'songs.artist.id': id },
        { $pull: { songs: { 'artist.id': id } } }
      )
      .exec();

    // Delete the artist from the artist collection
    const deleteArtistResult = await this.artistModel;

    console.log(`Deleted Artist: ${JSON.stringify(artistToDelete)}`);
    console.log(`Deleted Songs: ${JSON.stringify(deleteSongsResult)}`);
    console.log(`Updated Songs in Lists: ${JSON.stringify(updateListResult)}`);
  }
}
