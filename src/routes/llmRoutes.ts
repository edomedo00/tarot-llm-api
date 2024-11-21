import { Router } from 'express';
import { 
    startReading, readingElement, readingUnion, readingMixElements, 
    readingMixUnion, readingAdvice, readingAdviceFinal
 } from "../controllers/llmController_EN.js";
 import { 
    startReadingES, readingElementES, readingUnionES, readingMixElementsES, 
    readingMixUnionES, readingAdviceES, readingAdviceFinalES
 } from "../controllers/llmController_ES.js";
 import { synthesizeReading, getReadingSpeech } from "../controllers/ttsController.js";

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
router.get('/getReadingSpeech', getReadingSpeech);

// OPENDAY
import { 
   startReadingOpendayES,
   reading3cardsES
} from '../controllers/llmController_OPENDAY';


// Ruta para el openday
router.post('/start_openday_es', startReadingOpendayES);
router.post('/reading_3_cards_es', reading3cardsES);



export default router;

// curl -X POST "http://localhost:3000/llm-api/synthesizeReading" -H "Content-Type: application/json" -d "{\"reading\": \"La lectura del presente de tu vida se basa en las cartas del Hierofante, el As de Oros y la Sacerdotisa. El Hierofante representa la sabiduría y la guía interior, lo que sugiere que estás en un momento de introspección y búsqueda de la verdad. La presencia de este arcano en la lectura indica que debes confiar en tus instintos y escuchar tu corazón. El As de Oros simboliza la abundancia y la prosperidad, pero también puede indicar un comienzo o un nuevo ciclo en tu vida. Esto podría estar relacionado con una oportunidad o un proyecto que estás a punto de emprender. La combinación de este arcano con el Hierofante sugiere que debes abordar este nuevo comienzo con sabiduría y discernimiento. La Sacerdotisa es una carta que representa la conexión con la naturaleza y la feminidad. Su presencia en la lectura puede indicar que estás en un momento de equilibrio y armonía, y que debes cuidar de ti misma y de tu bienestar emocional. La combinación de esta carta con el Hierofante y el As de Oros sugiere que debes encontrar un equilibrio entre la razón y la intuición, y entre la acción y la contemplación. Recuerda que la lectura del tarot es subjetiva y que debes interpretar las cartas en función de tus propias experiencias y circunstancias. Esta lectura es solo un punto de partida para reflexionar y encontrar la sabiduría que necesitas en este momento.\"}" -OJ



// curl -X POST "http://10.70.18.97:3000/llm-api/synthesizeReading" -H "Content-Type: application/json" -d "{\"reading\": \"La lectura del presente de tu vida se basa en las cartas del Hierofante, el As de Oros y la Sacerdotisa. El Hierofante representa la sabiduría y la guía interior, lo que sugiere que estás en un momento de introspección y búsqueda de la verdad. La presencia de este arcano en la lectura indica que debes confiar en tus instintos y escuchar tu corazón. El As de Oros simboliza la abundancia y la prosperidad, pero también puede indicar un comienzo o un nuevo ciclo en tu vida. Esto podría estar relacionado con una oportunidad o un proyecto que estás a punto de emprender. La combinación de este arcano con el Hierofante sugiere que debes abordar este nuevo comienzo con sabiduría y discernimiento. La Sacerdotisa es una carta que representa la conexión con la naturaleza y la feminidad. Su presencia en la lectura puede indicar que estás en un momento de equilibrio y armonía, y que debes cuidar de ti misma y de tu bienestar emocional. La combinación de esta carta con el Hierofante y el As de Oros sugiere que debes encontrar un equilibrio entre la razón y la intuición, y entre la acción y la contemplación. Recuerda que la lectura del tarot es subjetiva y que debes interpretar las cartas en función de tus propias experiencias y circunstancias. Esta lectura es solo un punto de partida para reflexionar y encontrar la sabiduría que necesitas en este momento.\"}" -OJ
