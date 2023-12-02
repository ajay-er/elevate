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
        await ideaService.createIdea({ user: user.id, ...req.body });
        res.json({ status: 'OK', message: 'Idea created successfully' });
    }

    async deleteIdea(req: Request, res: Response) {
        const { ideaId } = req.body;
        await ideaService.deleteIdea(ideaId);
        res.json({ status: 'OK', message: 'Idea deleted successfully' });
    }

    async getIdea(req: Request, res: Response) {
        const { ideaId } = req.body;
        const idea = await ideaService.findIdea(ideaId);
        if (!idea) throw new BadRequestError('Idea not found');
        res.json({ idea, message: 'Idea found successfully' });
    }

    async addComment(req: Request, res: Response) {
        const { text, ideaId } = req.body;
        const userId = req.currentUser?.id;

        if (!userId) throw new UnAuthorizedError();

        const user = await userService.findUserById(userId);

        if (!user) throw new BadRequestError('user not found');

        const comment = await ideaService.addComment({ text, commentedUser:user.id });

        if (!comment) throw new Error('oops something wrong!');

        const idea = await ideaService.findIdeaAddComment(ideaId, comment.id);

        if (!idea) throw new BadRequestError('idea not found');

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

        const isUserLiked = idea.likes?.includes(user.id);

        let tag;
        if (isUserLiked) {
            await ideaService.removeLike(ideaId, likeUserId);
            tag = 'removed';
        } else {
            await ideaService.addLike(ideaId, likeUserId);
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

        let tag;
        if (isUserDisliked) {
            await ideaService.removeDislike(ideaId, dislikedUserid);
            tag = 'removed';
        } else {
            await ideaService.addDislike(ideaId, dislikedUserid);
            tag = 'added';
        }
        res.json({ status: 'OK', message: `dislike ${tag}` });
    }
}

export const IdeaController = new ideaController();
