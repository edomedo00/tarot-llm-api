import { Router } from 'express';
import { 
    startReading, readingElement, readingUnion, readingMixElements, 
    readingMixUnion, readingAdvice, readingAdviceFinal
 } from "../controllers/llmController_EN.js";
 import { 
    startReadingES, readingElementES, readingUnionES, readingMixElementsES, 
    readingMixUnionES, readingAdviceES, readingAdviceFinalES
 } from "../controllers/llmController_ES.js";
 import { synthesizeReading } from "../controllers/ttsController.js";

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

// Synthesize speech
router.post('/synthesizeReading', synthesizeReading);


// OPENDAY
import { 
   startReadingOpendayES,
   reading3cardsES
} from '../controllers/llmController_OPENDAY';


// Ruta para el openday
router.post('/start_openday_es', startReadingOpendayES);
router.post('/reading_3_cards_es', reading3cardsES);



export default router;

// curl -X POST "http://localhost:3000/llm-api/synthesize" -H "Content-Type: application/json" -d "{\"text\": \"Hello, this is a test.\"}" --output output.mp3
