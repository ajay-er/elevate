import { ICommentByUser } from '../../interfaces';
import { Comment } from '../model/Comment';
import { IIdea, Idea } from '../model/Idea';

export class IdeaRepository {
    async allIdeas(): Promise<IIdea[]> {
        return await Idea.find({}).sort({ createdAt: -1 });
    }

    async create(data: IIdea): Promise<IIdea> {
        return await Idea.create(data);
    }

    async deleteIdea(id: string) {
        return await Idea.findByIdAndDelete({ id });
    }

    async findIdeaById(id: string) {
        return await Idea.findById({ id }).populate('comments');
    }

    async addComment(comment: ICommentByUser) {
        const {text, commentedUser } = comment;
        return await Comment.create({ user:commentedUser , text });
    }

    async deleteComment(id: string) {
        return await Comment.findByIdAndDelete({ id });
    }

    async updateIdeaById(id:string,updation: Partial<IIdea>) {
        return await Idea.findByIdAndUpdate({ id }, updation);
    }

    async addCommentIdInIdea(id:string,commentId:string) {
        return await Idea.findByIdAndUpdate({ id }, { $addToSet: { comments: commentId } });
    }

    async removeCommentIdFromIdea(id:string,commentId:string) {
        return await Idea.findByIdAndUpdate({ id }, { $pull: { comments: commentId } });
    }

    async removeLike(id:string,likedUserid:string) {
        return await Idea.updateOne({ id }, { $pull: { likes: likedUserid } });
    }

    async addLike(id:string,likedUserid:string) {
        return await Idea.updateOne({ id }, { $addToSet: { likes: likedUserid } });
    }

    async removeDislike(id:string,dislikedUserid:string) {
        return await Idea.updateOne({ id }, { $pull: { dislikes: dislikedUserid } });
    }

    async addDislike(id:string,dislikedUserid:string) {
        return await Idea.updateOne({ id }, { $addToSet: { dislikes: dislikedUserid } });
    }

}
