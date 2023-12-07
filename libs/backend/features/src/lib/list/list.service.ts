import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { List as ListModel, ListDocument } from './list.schema';
import { IList } from '@indivproj-p2/shared/api';
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
    const items = await this.listModel.find().exec();
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

  async create(list: CreateListDto): Promise<IList> {
    const lastList = await this.listModel.findOne().sort({ _id: -1 }).exec();

    if(lastList){
      list.id = String(Number(lastList.id) + 1);
    }
    else{
      list.id = '1';
    }

    list.creationDate = new Date();

    const createdList = new this.listModel(list);

    return createdList.save();
  }

  async update(id: string, list: UpdateListDto): Promise<IList | null> {
    const updatedList = await this.listModel
      .findOneAndUpdate({ id }, list)
      .exec();

    return updatedList;
  }

  async deleteList(id: string): Promise<void> {
    this.listModel.findOneAndDelete({ id }).exec();
  }
}
