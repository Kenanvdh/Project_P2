import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListController } from './list/list.controller';
import { ListService } from './list/list.service';
import { List, ListSchema } from './list/list.schema';
import { User, UserSchema } from './user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }, { name: User.name, schema: UserSchema }])
  ],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService],
})
export class ListModule {}
