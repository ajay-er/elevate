import express from 'express';
import { IdeaController } from '../controllers/idea.controller';
import { requireAuth } from '@ajay404/elevate';

const router = express.Router();

router.get('/api/v1/ideas/all',IdeaController.allIdeas);
router.post('/api/v1/ideas/create',requireAuth,IdeaController.createIdea);
router.delete('/api/v1/ideas/delete',requireAuth,IdeaController.deleteIdea);

router.get('/api/v1/ideas/:id',IdeaController.getIdea);

router.post('/api/v1/ideas/comments/add',requireAuth, IdeaController.addComment);
router.delete('/api/v1/ideas/comments/delete',requireAuth,IdeaController.deleteComment);

router.patch('/api/v1/ideas/like',requireAuth,IdeaController.toogleLike);
router.patch('/api/v1/ideas/dislike',requireAuth,IdeaController.toogleDislike);

export { router as ideasRoute };
