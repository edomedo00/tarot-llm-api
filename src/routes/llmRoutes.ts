import { Router } from 'express';
import { 
    startReading, readingElement, readingUnion, readingMixElements, 
    readingMixUnion, readingAdvice, readingAdviceFinal
 } from '../controllers/llmController_EN';
 import { 
    startReadingES, readingElementES, readingUnionES, readingMixElementsES, 
    readingMixUnionES, readingAdviceES, readingAdviceFinalES
 } from '../controllers/llmController_ES';

const router = Router();

// English routes
router.post('/start', startReading);
router.post('/reading_element', readingElement);
router.post('/reading_union', readingUnion);
router.post('/reading_mix_elements', readingMixElements);
router.post('/reading_mix_union', readingMixUnion);
router.post('/reading_advice', readingAdvice);
router.post('/reading_advice_final', readingAdviceFinal);

// Spanish routes
router.post('/start_es', startReadingES);
router.post('/reading_element_es', readingElementES);
router.post('/reading_union_es', readingUnionES);
router.post('/reading_mix_elements_es', readingMixElementsES);
router.post('/reading_mix_union_es', readingMixUnionES);
router.post('/reading_advice_es', readingAdviceES);
router.post('/reading_advice_final_es', readingAdviceFinalES);


export default router;