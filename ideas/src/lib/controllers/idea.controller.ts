import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IdeaService } from '../service/idea.service';
import { UserService } from '../service/user.service';
import { BadRequestError, UnAuthorizedError } from '@ajay404/elevate';

const ideaService = container.resolve(IdeaService);
const userService = container.resolve(UserService);

class ideaController {
    async allIdeas(req: Request, res: Response) {
        const ideas = await ideaService.allIdeas();
        res.status(200).send(ideas);
    }

    async createIdea(req: Request, res: Response) {
        const userId = req.currentUser?.id;
        if (!userId) throw new UnAuthorizedError();

        const user = await userService.findUserById(userId);
        if (!user) throw new BadRequestError('User not found');
        const idea = await ideaService.createIdea({ user: user.id, ...req.body });
        res.json({ idea ,status: 'OK', message: 'Idea created successfully' });
    }

    async deleteIdea(req: Request, res: Response) {
        const { ideaId } = req.body;
        await ideaService.deleteIdea(ideaId);
        res.json({ status: 'OK', message: 'Idea deleted successfully' });
    }

    async getIdea(req: Request, res: Response) {
        const  ideaId  = req.params.ideaId;
        const idea = await ideaService.findIdea(ideaId);
        if (!idea) throw new BadRequestError('Idea not found');
        res.json({ idea, message: 'Idea found successfully' });
    }

    async addComment(req: Request, res: Response) {
        const { text, ideaId } = req.body;
        const userId = req.currentUser?.id;
        if (!userId) throw new UnAuthorizedError();

        const isIdea = await ideaService.findIdea(ideaId);
        if (!isIdea) throw new BadRequestError('Idea not found');

        const user = await userService.findUserById(userId);

        if (!user) throw new BadRequestError('user not found');

        const comment = await ideaService.addComment({ text, commentedUser:user.id });

        if (!comment) throw new Error('oops something wrong!');

        await ideaService.addCommentToIdea(ideaId, comment.id);

        res.json({ message: 'comment added successfully' });
    }

    async deleteComment(req: Request, res: Response) {
        const { ideaId , commentId } = req.body;
        await ideaService.deleteComment(ideaId , commentId);
        res.json({ message: 'comment deleted successfully' });
    }

    async toogleLike(req: Request, res: Response) {
        const { ideaId } = req.body;
        const likeUserId = req.currentUser?.id;
        if (!likeUserId) throw new UnAuthorizedError();

        const user = await userService.findUserById(likeUserId);
        if (!user) throw new BadRequestError('user not found');

        const idea = await ideaService.findIdea(ideaId);
        if (!idea) throw new BadRequestError('idea not found');
        const isUserDisliked = idea.dislikes?.includes(user.id);
        const isUserLiked = idea.likes?.includes(user.id);

        let tag;
        if (isUserLiked) {
            await ideaService.removeLike(ideaId, user.id);
            tag = 'removed';
        } else {
            if (isUserDisliked)  await ideaService.removeDislike(ideaId,user.id);
            await ideaService.addLike(ideaId, user.id);
            tag = 'added';
        }
        res.json({ status: 'OK', message: `like ${tag}` });
    }

    async toogleDislike(req: Request, res: Response) {
        const { ideaId } = req.body;
        const dislikedUserid = req.currentUser?.id;
        if (!dislikedUserid) throw new UnAuthorizedError();

        const user = await userService.findUserById(dislikedUserid);
        if (!user) throw new BadRequestError('user not found');

        const idea = await ideaService.findIdea(ideaId);
        if (!idea) throw new BadRequestError('idea not found');

        const isUserDisliked = idea.dislikes?.includes(user.id);
        const isUserLiked = idea.likes?.includes(user.id);

        let tag;
        if (isUserDisliked) {
            await ideaService.removeDislike(ideaId, user.id);
            tag = 'removed';
        } else {
            if (isUserLiked) ideaService.removeLike(ideaId,user.id);
            await ideaService.addDislike(ideaId, user.id);
            tag = 'added';
        }
        res.json({ status: 'OK', message: `dislike ${tag}` });
    }
}

export const IdeaController = new ideaController();
