import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantsModule } from './applicants/applicants.module';
import { PDFFile } from './pdf/pdf.entity';
import { UpdatesService } from './updates/updates.service';
import { UpdatesController } from './updates/updates.controller';
import { UpdatesModule } from './updates/updates.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '141777',
      database: 'redberry',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
    }),
    MulterModule.register({ dest: './uploads/*' }),
    ApplicantsModule,
    PDFFile,
    UpdatesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
