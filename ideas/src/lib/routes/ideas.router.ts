import express from 'express';
import { IdeaController } from '../controllers/idea.controller';

const router = express.Router();

router.get('/api/v1/ideas/all',IdeaController.allIdeas);
router.post('/api/v1/ideas/create',IdeaController.createIdea);
router.delete('/api/v1/ideas/delete',IdeaController.deleteIdea);

router.get('/api/v1/ideas/:id',IdeaController.getIdea);

router.post('/api/v1/ideas/comments/add',IdeaController.addComment);
router.delete('/api/v1/ideas/comments/delete',IdeaController.deleteComment);

router.patch('/api/v1/ideas/like',IdeaController.likeIdea);
router.patch('/api/v1/ideas/dislike',IdeaController.dislikeIdea);

export { router as ideasRoute };
