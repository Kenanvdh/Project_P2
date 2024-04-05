import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { List as ListModel, ListDocument } from './list.schema';
import { IList } from '@indivproj-p2/shared/api';
import { Logger } from '@nestjs/common';
import { CreateListDto, UpdateListDto } from '@indivproj-p2/backend/dto';
import { NeoService } from '../neo/neo.service';

@Injectable()
export class ListService {
  TAG = 'ListService';

  private readonly logger: Logger = new Logger(ListService.name);

  constructor(
    @InjectModel(ListModel.name) private listModel: Model<ListDocument>,
    private readonly neoService: NeoService
  ) {}

  async getAll(): Promise<IList[]> {
    Logger.log('getAll', this.TAG);
    const items = await this.listModel.find().exec();
    return items;
  }

  async getOne(id: string): Promise<IList | null> {
    Logger.log(`getOne(${id})`, this.TAG);
    const list = await this.listModel.findOne({ id }).exec();
    if (!list) {
      throw new NotFoundException(`List with id ${id} not found`);
    }
    
    this.neoService.recommend(list);
    
    return list;
  }

  async create(list: CreateListDto): Promise<IList> {
    const lastList = await this.listModel.findOne().sort({ _id: -1 }).exec();

    if (lastList) {
      list.id = String(Number(lastList.id) + 1);
    } else {
      list.id = '1';
    }

    list.creationDate = new Date();

    const createdList = new this.listModel(list);
    this.neoService.addOrUpdateList(createdList);
    for (const song of list.songs) {
      this.neoService.addSongToList(song, createdList);
    }
    return createdList.save();
  }

  async update(id: string, list: UpdateListDto): Promise<IList | null> {
    const listToUpdate = await this.getOne(id);

    if (listToUpdate) {
      await this.listModel.updateOne({ id }, list);
      this.neoService.addOrUpdateList(listToUpdate);
    }

    return listToUpdate;
  }

  async deleteList(id: string): Promise<void> {
    const list = await this.getOne(id);
    await this.listModel.deleteOne({ id }).exec();
    if (list) {
      this.neoService.deleteList(list);
    }
  }
}
