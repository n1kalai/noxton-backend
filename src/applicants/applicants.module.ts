import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PDFFile } from 'src/pdf/pdf.entity';
import { ApplicantsController } from './applicants.controller';
import { Applicants } from './applicants.entity';
import { ApplicantsService } from './applicants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Applicants, PDFFile])],
  controllers: [ApplicantsController],
  providers: [ApplicantsService],
})
export class ApplicantsModule {}
