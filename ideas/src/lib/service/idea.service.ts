import { autoInjectable } from 'tsyringe';
import { IdeaRepository } from '../database/repository/idea.repository';
import { IIdea } from '../database/model/Idea';
import { ICommentByUser } from '../interfaces';

@autoInjectable()
export class IdeaService {
    constructor(private readonly ideaRepo: IdeaRepository) {}

    public async allIdeas() {
        return await this.ideaRepo.allIdeas();
    }

    public async createIdea(data: IIdea) {
        return await this.ideaRepo.create(data);
    }

    public async deleteIdea(id: string) {
        return await this.ideaRepo.deleteIdea(id);
    }

    public async findIdea(id: string) {
        return await this.ideaRepo.findIdeaById(id);
    }

    public async addComment(comment: ICommentByUser) {
        return await this.ideaRepo.addComment(comment);
    }

    public async findIdeaAddComment(id: string, commentId: string) {
        return await this.ideaRepo.addCommentIdInIdea(id, commentId);
    }

    public async deleteComment(ideaId: string,commentId: string) {
        await this.ideaRepo.deleteComment(commentId);
        return this.ideaRepo.removeCommentIdFromIdea(ideaId, commentId);
    }

    public async removeLike(ideaId:string,userId:string) {
        return this.ideaRepo.removeLike(ideaId,userId);
    }

    public async addLike(ideaId:string,userId:string) {
        return this.ideaRepo.addLike(ideaId,userId);
    }

    public async removeDislike(ideaId:string,userId:string) {
        return this.ideaRepo.removeDislike(ideaId,userId);
    }

    public async addDislike(ideaId:string,userId:string) {
        return this.ideaRepo.addDislike(ideaId,userId);
    }
}
