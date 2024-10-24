import { Request, Response, NextFunction } from 'express';
import { createSession } from '../models/llm-setup';
import path from 'path';
import fs from 'fs';

let session: any;
let initialChatHistory: any;
const contextsPath = path.join(__dirname, '../../resources/reading_contexts.json');
let contexts;

const initSession = async (req: Request, res: Response) => {
    session = await createSession();
    initialChatHistory = session.getChatHistory();
    res.status(200).json({ message: "LLM session initialized." });
};

const readingElement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {card, element} = req.body;

    if (!session) {
        res.status(400).json({ error: "Session not initialized." });
        return;
    }

    try {
        contexts = JSON.parse(fs.readFileSync(contextsPath, 'utf-8'));
    } catch (err) {
        next(new Error("Failed to load reading contexts."));
        return;
    }

    const contextObj = contexts.elements.find((ctx: { name: string }) => ctx.name === element);

    if (!contextObj) {
        res.status(404).json({ error: `No context found for element: ${element}` });
        return;
    }

    const prompt = `
        You are given a tarot card and a specific context. Generate a reading that combines the card's meaning with the context, but do not give guidance of life, use the card's deep meaning to generate the reading instead. Act as a tarot reader, try to keep the reading abstract to leave space for personal interpretation and analysis. Do not exceed 200 words, only return a concise text, no title nor format. Start with the reading itself, no need for introduction words like "The x card in the context of..." or things like this.


        ### Card Name:
        ${card}

        ### Context:
        ${contextObj.title}. ${contextObj.description}

        ### Combined Reading:
    `;

    try {
        const result = await session.prompt(prompt);
        
        // const result = await session.prompt(prompt, {
            //     temperature: 0.8,
            //     topK: 40,
            //     topP: 0.02,
            //     seed: 2462
            // });
            
        session.setChatHistory(initialChatHistory);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const readingUnion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {card, union} = req.body;

    if (!session) {
        res.status(400).json({ error: "Session not initialized." });
        return;
    }

    try {
        contexts = JSON.parse(fs.readFileSync(contextsPath, 'utf-8'));
    } catch (err) {
        next(new Error("Failed to load reading contexts."));
        return;
    }

    const contextObj = contexts.unions.find((ctx: { name: string }) => ctx.name === union);

    if (!contextObj) {
        res.status(404).json({ error: `No context found for union context: ${union}` });
        return;
    }

    const prompt = `
        You are given a tarot card and a specific context. Generate a reading that combines the card's meaning with the context, but do not give guidance of life, use the card's deep meaning to generate the reading instead. Act as a tarot reader, try to keep the reading abstract to leave space for personal interpretation and analysis. Do not exceed 200 words, only return a concise text, no title nor format. Start with the reading itself, no need for introduction words like "The x card in the context of..." or things like this.

        ### Card Name:
        ${card}

        ### Context:
        ${contextObj.title}. ${contextObj.description}

        ### Combined Reading:
    `;

    try {
        const result = await session.prompt(prompt);
        session.setChatHistory(initialChatHistory);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const readingMixElements = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {reading_1, reading_2} = req.body;

    if (!session) {
        res.status(400).json({ error: "Session not initialized." });
        return;
    }

    const prompt = `
        You are given two tarot readings from which you will generate a text that combines them trying to preserve the inner message of both. Act as a tarot reader, try to keep the text abstract to leave space for personal interpretation and analysis, but be concise. Do not exceed 200 words, only return a concise text, no title nor format. Start with the text itself, no need for introduction words.

        ### Reading 1:
        ${reading_1}

        ### Reading 2:
        ${reading_2}

        ### Combined reading:
    `;

    try {
        const result = await session.prompt(prompt);
        session.setChatHistory(initialChatHistory);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const readingMixUnion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {elements_mix_text, reading_union} = req.body;

    if (!session) {
        res.status(400).json({ error: "Session not initialized." });
        return;
    }

    const prompt = `
        You are given a tarot reading and a text (made from two readings combined). Generate a new text that combines them trying to preserve the inner message of both. Act as a tarot reader, try to write a text that leaves space for personal interpretation and analysis, but be concise. Do not exceed 200 words, only return a concise text, no title nor format. Start with the text itself, no need for introduction words.

        ### Reading:
        ${reading_union}
        
        ### Text:
        ${elements_mix_text}

        ### Combined text:
    `;

    try {
        const result = await session.prompt(prompt);
        session.setChatHistory(initialChatHistory);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


const readingAdvice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {card_1, card_2} = req.body;

    if (!session) {
        res.status(400).json({ error: "Session not initialized." });
        return;
    }

    const prompt = `
        You are given two tarot cards from which you will generate a life advice. Generate a text based on the inner significance of both cards. Act as a tarot reader, try to write a text that leaves space for personal interpretation and analysis, but be concise. Do not exceed 200 words, only return a concise text, no title nor format. Start with the text itself, no need for introduction words.

        ### Card 1 Name:
        ${card_1}

        ### Card 2 Name:
        ${card_2}

        ### Advice:
    `;

    try {
        const result = await session.prompt(prompt);
        session.setChatHistory(initialChatHistory);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


const readingAdviceFinal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {cardReading_1, cardReading_2, cardReading_3, cardReading_4, inputAdvice} = req.body;

    if (!session) {
        res.status(400).json({ error: "Session not initialized." });
        return;
    }

    const prompt = `
        You are given four tarot readings that come from a specific card each and an advice coming from tarot cards as well. Generate a new advice that comes from analyzing the four given readings and the advice. Try to preserve the inner meaning of each reading and the advice as much as you can, but be concise and try to focus on a situation given the cards. Remember that the input advice should try to wrap the four readings. Act as a tarot reader, try to write a text that leaves space for personal interpretation and analysis, but be concise. Do not exceed 200 words, only return a concise text, no title nor format. Start with the text itself, no need for introduction words.

        ### Card reading 1:
        ${cardReading_1}

        ### Card reading 2:
        ${cardReading_2}

        ### Card reading 3:
        ${cardReading_3}

        ### Card reading 4:
        ${cardReading_4}

        ### Input advice:
        ${inputAdvice}

        ### Generated advice:
    `;

    try {
        const result = await session.prompt(prompt);
        session.setChatHistory(initialChatHistory);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export {
    initSession,
    readingElement,
    readingUnion,
    readingMixElements,
    readingMixUnion,
    readingAdvice,
    readingAdviceFinal
};


// deberia dar algo de consejo o sugerir cosas o predecir sutilmente el futuro? o solamente ofrecer informacion sobre el pasado y tu vida en el presente
/*
    {
    "card": "the fool",
    "union": "spark"   
    }
    "The Fool has emerged, carrying the weight of innocence and new beginnings. 
    In the realm of the Creative Spark, this card suggests that you are on the cusp of a profound awakening, 
    where the boundaries between reality and possibility blur. Your inner source of wisdom is stirring, 
    guiding you towards a path of uncharted territory, where the conventional rules no longer apply. 
    Trust in the spark within, and allow yourself to be guided by the whispers of your intuition. 
    A radical transformation is imminent, one that will ignite your inner fire and set you ablaze with 
    creative potential. Will you take the leap of faith, or will you remain anchored in the familiar? 
    The choice is yours, but the universe is urging you to take the first step into the unknown."  
*/