import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdatesModule } from 'src/updates/updates.module';
import { PDFFile } from '../pdf/pdf.entity';
import { Updates } from '../updates/updates.entity';
import { ApplicantsController } from './applicants.controller';
import { Applicants } from './applicants.entity';
import { ApplicantsService } from './applicants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Applicants, PDFFile, Updates])],
  controllers: [ApplicantsController],
  providers: [ApplicantsService],
})
export class ApplicantsModule {}
