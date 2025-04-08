import express from 'express';
import { checkAuth, handleValidationErrors } from '../../utils/index.js';
import { postCreateValidation } from '../../validations/validations.js';
import { PostController } from '../../controllers/index.js';

const router = express.Router();

router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getOnePost);
router.get('/tags', PostController.getLastTags);
router.post('/', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
router.delete('/:id', checkAuth, PostController.removePost);
router.patch('/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.updatePost);

export default router;
