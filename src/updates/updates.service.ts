import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Updates } from './updates.entity';

@Injectable()
export class UpdatesService {
    constructor(
        @InjectRepository(Updates)
        private updatesRepo: Repository<Updates>
    ){}
    async addCommentToUpdate(data) {
        const {updateId:id,comment} = data
        const foundUpdate = await this.updatesRepo.findOne(id)
        foundUpdate.comment = comment
        return this.updatesRepo.save(foundUpdate);

    }
}
