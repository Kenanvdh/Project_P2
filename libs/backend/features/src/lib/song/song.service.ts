import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Song as SongModel, SongDocument } from './song.schema';
import { List as ListModel, ListDocument } from '../list/list.schema';
import { ISong } from '@indivproj-p2/shared/api';
import { Logger } from '@nestjs/common';
import { CreateSongDto, UpdateSongDto } from '@indivproj-p2/backend/dto';

@Injectable()
export class SongService {
  TAG = 'SongService';

  private readonly logger: Logger = new Logger(SongService.name);

  constructor(
    @InjectModel(SongModel.name) private songModel: Model<SongDocument>,
    @InjectModel(ListModel.name) private listModel: Model<ListDocument>
  ) {}

  async getAll(): Promise<ISong[]> {
    Logger.log('getAll', this.TAG);
    const items = await this.songModel.find().populate('artist.name').exec();
    return items;
  }

  async getOne(id: string): Promise<ISong | null> {
    Logger.log(`getOne(${id})`, this.TAG);
    const song = await this.songModel.findOne({ id }).populate('artist').exec();
    if (!song) {
      throw new NotFoundException(`Song with id ${id} not found`);
    }
    return song;
  }

  async create(song: CreateSongDto): Promise<ISong> {
    const lastSong = await this.songModel.findOne().sort({ id: -1 }).exec();

    // Calculate the new numeric part of the id
    const newNumericId = lastSong
      ? parseInt(lastSong.id.match(/\d+/)[0], 10) + 1
      : 1;

    // Set the new id in the song data
    song.id = `${newNumericId}`;
    const createdSong = new this.songModel(song);

    return createdSong.save();
  }

  async update(id: string, song: UpdateSongDto): Promise<ISong | null> {
    console.log(
      `Updating song with id ${id} and artist ${JSON.stringify(song.artist)}`
    );

    const updatedSong = await this.songModel
      .findOneAndUpdate({ id }, song, { new: true })
      .exec();

    if (!updatedSong) {
      throw new NotFoundException(`Song with id ${id} not found`);
    }

    // Find and update the song in each list
    const updateResult = await this.listModel
      .updateMany(
        { 'songs.id': updatedSong.id },
        { $set: { 'songs.$': updatedSong } }
      )
      .exec();

    console.log(`List update result: ${JSON.stringify(updateResult)}`);
    console.log(`Updated song: ${JSON.stringify(updatedSong)}`);

    return updatedSong;
  }

  async deleteSong(id: string): Promise<void> {
    Logger.log(`Deleting song with id ${id}`, this.TAG);

    // Delete the song from the database
    const songToDelete = await this.songModel.findOneAndDelete({ id }).exec();
    if (!songToDelete) {
      throw new NotFoundException(`Song with id ${id} not found`);
    }

    // Delete the song from all lists
    const deleteResult = await this.listModel
      .updateMany({ 'songs.id': id }, { $pull: { songs: { id } } })
      .exec();

    Logger.log(`Delete result: ${JSON.stringify(deleteResult)}`);
  }
}
