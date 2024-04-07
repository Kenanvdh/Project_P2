import {
  Controller,
  Delete,
  Put,
  Get,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { ListService } from './list.service';
import { IList } from '@indivproj-p2/shared/api';
import { CreateListDto, UpdateListDto } from '@indivproj-p2/backend/dto';
import { NeoService } from '../neo/neo.service';

@Controller('list')
export class ListController {
  constructor(private listService: ListService, private neoService: NeoService) {}

  @Get('')
  getAll(): Promise<IList[]> {
    return this.listService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Promise<IList | null> {
    return this.listService.getOne(id);
  }

  @Get('/:id/recommended')
  reccommend(@Param('id') id: string): Promise<IList[] | null> {
    return this.neoService.recommend(id);
  }

  @Post('')
  create(@Body()list: CreateListDto): Promise<IList> {
    return this.listService.create(list);
  }

  @Put('/:id')
  edit(
    @Param('id') id: string,
    @Body() list: UpdateListDto
  ): Promise<IList | null> {
    return this.listService.update(id, list);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.listService.deleteList(id);
  }
}
