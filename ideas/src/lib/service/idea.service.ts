import { autoInjectable } from 'tsyringe';
import { IdeaRepository } from '../database/repository/idea.repository';
import { IIdea } from '../database/model/Idea';

@autoInjectable()
export class IdeaService {
    constructor(private readonly ideaRepo: IdeaRepository) {}

    public async allIdeas() {
        return await this.ideaRepo.allIdeas();
    }

    public async create(data:IIdea) {
        return await this.ideaRepo.create(data);
    }
   
}
