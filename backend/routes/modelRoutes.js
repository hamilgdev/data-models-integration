import express from 'express';
import { getModels, getModelsById } from '../controller/modelController.js';

const router = express.Router();

router.route('/').get(getModels);

router.route('/:id').get(getModelsById);

export default router;
