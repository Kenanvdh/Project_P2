import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListController } from './list/list.controller';
import { ListService } from './list/list.service';
import { List, ListSchema } from './list/list.schema';
import { User, UserSchema } from './user/user.schema';
import { NeoService } from './neo/neo.service';
import { ConfigModule } from '@nestjs/config';
import { NeoModule } from './neo.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }, { name: User.name, schema: UserSchema }]),
    ConfigModule,
    NeoModule
  ],
  controllers: [ListController],
  providers: [ListService, NeoService],
  exports: [ListService],
})
export class ListModule {}
