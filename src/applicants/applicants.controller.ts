import { Applicants } from 'src/applicants/applicants.entity';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../utils';
import { ApplicantsService } from './applicants.service';
import { ApplicantCredentials } from './dto/ApplicantCredentials.dto';

@Controller('applicants')
export class ApplicantsController {
  constructor(private applicantsSerice: ApplicantsService) {}

  @Post('/add')
  @UseInterceptors(
    FileInterceptor('cv', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  createApplicant(
    @Body() data: ApplicantCredentials,
    @UploadedFile() file,
  ): Promise<ApplicantCredentials> {
    return this.applicantsSerice.createApplicant(data, file);
  }

  @Get('/get-all')
  getApplicants() {
    return this.applicantsSerice.getApplicants();
  }

  @Get('/cv/:cvpath')
  seeUploadedFile(@Param('cvpath') pdf: string, @Res() res) {
    return res.sendFile(pdf, { root: './uploads' });
  }

  @Get("/status-count")
  getApplicantsStatusesCount() {
    return this.applicantsSerice.getApplicantsStatusesCount();
  }

  @Get("/search/:searchString")
  findBySomething(@Param('searchString') searchString: string) : Promise<ApplicantCredentials[]> {
    return this.applicantsSerice.findBySomething(searchString);
  }

  @Get("/byId/:id")
  getApplicant(@Param('id') id: string) : Promise<ApplicantCredentials> {
    return this.applicantsSerice.getApplicant(id);
  }

  @Post("/by-date")
  getApplicantsByDate(@Body() body: {
    startDate: string
    endDate: string
}) : Promise<Applicants[]> {
    return this.applicantsSerice.getApplicantsByDate(body);
  }

  @Post("/update")
  addUpdateToApplicant(@Body() body: any) : Promise<Applicants> {
    return this.applicantsSerice.addUpdateToApplicant(body);
  }
}
