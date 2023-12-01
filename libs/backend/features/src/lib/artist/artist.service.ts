import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Artist as ArtistModel, ArtistDocument } from './artist.schema';
import { IArtist } from '@indivproj-p2/shared/api';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ArtistService {
  TAG = 'ArtistService';

  private readonly logger: Logger = new Logger(ArtistService.name);

  constructor(
    @InjectModel(ArtistModel.name) private artistModel: Model<ArtistDocument> 
  ) {}

  async getAll(): Promise<IArtist[]> {
    console.log(`Fetching all artists`);
    const items = await this.artistModel.find().exec();
    return items;  }

  async getById(id: string): Promise<IArtist | null> {
    console.log(`Fetching artist with ID: ${id}`);
    const artist = await this.artistModel.findOne({ id }).exec();
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }
}
