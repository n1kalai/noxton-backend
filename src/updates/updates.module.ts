import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdatesController } from './updates.controller';
import { Updates } from './updates.entity';
import { UpdatesService } from './updates.service';

@Module({
    imports: [TypeOrmModule.forFeature([Updates])],
    controllers: [UpdatesController],
    providers: [UpdatesService]
})

export class UpdatesModule {}
