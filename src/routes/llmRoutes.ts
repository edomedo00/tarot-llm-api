import { Router } from 'express';
import { initSession, promptLLM } from '../controllers/llmController';

const router = Router();

router.post('/init', initSession);
router.post('/prompt', promptLLM);

export default router;
