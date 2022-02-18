import { Body, Controller, Post } from '@nestjs/common';
import { UpdatesService } from './updates.service';

@Controller('updates')
export class UpdatesController {
    constructor(private updatesSerice: UpdatesService) {}

    @Post('/add-comment')
    addCommentToUpdate(@Body() comment: {updateId: string;comment:string}) {
        return this.updatesSerice.addCommentToUpdate(comment)
    }
}
