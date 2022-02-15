import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantsModule } from './applicants/applicants.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '141777',
      database: 'redberry',
      synchronize: true
    }),
    MulterModule.register({ dest: './files/*' }),
    ApplicantsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
