import { Router } from 'express';
import { 
    initSession, readingElement, readingUnion, readingMixElements, 
    readingMixUnion, readingAdvice, readingAdviceFinal
 } from '../controllers/llmController';

const router = Router();

router.post('/init', initSession);
router.post('/reading_element', readingElement);
router.post('/reading_union', readingUnion);
router.post('/reading_mix_elements', readingMixElements);
router.post('/reading_mix_union', readingMixUnion);
router.post('/reading_advice', readingAdvice);
router.post('/reading_advice_final', readingAdviceFinal);


export default router;
