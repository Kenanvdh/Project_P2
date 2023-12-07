import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { List as ListModel, ListDocument } from './list.schema';
import { Gender, IList, UserRole } from '@indivproj-p2/shared/api';
import { Logger } from '@nestjs/common';
import { CreateListDto, UpdateListDto } from '@indivproj-p2/backend/dto';

@Injectable()
export class ListService {
  TAG = 'ListService';

  private readonly logger: Logger = new Logger(ListService.name);

  constructor(
    @InjectModel(ListModel.name) private listModel: Model<ListDocument>
  ) {}

  async getAll(): Promise<IList[]> {
    Logger.log('getAll', this.TAG);
    const items = await this.listModel.find().populate('creator.name').exec();
    return items;
  }

  async getOne(id: string): Promise<IList | null> {
    Logger.log(`getOne(${id})`, this.TAG);
    const list = await this.listModel.findOne({ id }).exec();
    if (!list) {
      throw new NotFoundException(`List with id ${id} not found`);
    }
    return list;
  }

  async create(userId: string, list: CreateListDto): Promise<IList> {
    const lastList = await this.listModel.findOne().sort({ id: -1 }).exec();

    // Calculate the new numeric part of the id
    const newNumericId = lastList
      ? parseInt(lastList.id.match(/\d+/)[0], 10) + 1
      : 1;

    // Set the new id in the List data
    list.id = newNumericId.toString();
    list.creationDate = new Date();
    list.creator.id = userId;
    const createdList = new this.listModel(list);

    return createdList.save();
  }

  async update(id: string, list: UpdateListDto): Promise<IList | null> {
    const updatedList = await this.listModel.findOneAndUpdate({ id }, list).exec();

    return updatedList;
  }
  
  async deleteList(id: string): Promise<void> {
    this.listModel.findOneAndDelete({ id }).exec();
  }
}
