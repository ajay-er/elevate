import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IdeaService } from '../service/idea.service';

const ideaService = container.resolve(IdeaService);

class ideaController {
    async allIdeas(req: Request, res: Response) {
        const ideas = await ideaService.allIdeas();
        res.status(200).send(ideas);
    }

    async createIdea(req: Request, res: Response) {
        const { idea } = req.body;
        await ideaService.create(idea);
        res.json({status:'OK',message:'Idea created successfully'});
    }

    async deleteIdea(req: Request, res: Response) {
        
    }

    async getIdea(req: Request, res: Response) {}

    async addComment(req: Request, res: Response) {}
    async deleteComment(req: Request, res: Response) {}
    async likeIdea(req: Request, res: Response) {}
    async dislikeIdea(req: Request, res: Response) {}
}

export const IdeaController = new ideaController();
