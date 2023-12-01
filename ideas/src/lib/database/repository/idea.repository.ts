import { IIdea, Idea } from '../model/Idea';

export class IdeaRepository {

    async allIdeas(): Promise<IIdea[]> {
        return await Idea.find({}).sort({ createdAt: -1 });
    }

    async create(data: IIdea): Promise<IIdea> {
        return await Idea.create(data);
    }
}
