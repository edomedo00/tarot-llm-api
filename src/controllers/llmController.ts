import { Request, Response, NextFunction } from 'express';
import { createSession } from '../models/llm-setup';
import path from 'path';
import fs from 'fs';

let session: any;
const contextsPath = path.join(__dirname, '../../resources/reading_contexts.json');
let contexts;

const initSession = async (req: Request, res: Response) => {
    session = await createSession();
    res.status(200).json({ message: "LLM session initialized." });
};

const promptLLM = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { question } = req.body;
    if (!session) {
        res.status(400).json({ error: "Session not initialized." });
        return;
    }

    try {
        const answer = await session.prompt(question);
        res.status(200).json({ answer });
    } catch (error) {
        next(error); 
    }
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
        You are given a tarot card and a specific context. Generate a reading that combines the card's meaning with the context to provide personalized guidance.

        ### Card Name:
        ${card}

        ### Context:
        ${contextObj.context}

        ### Combined Reading:
    `;

    try {
        const result = await session.prompt(prompt);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const readingUnion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await session.readingUnion(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const readingMixElements = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await session.readingMixElements(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const readingMixUnion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await session.readingMixUnion(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const readingAdvice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await session.readingAdvice(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const readingAdviceComplete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await session.readingAdviceComplete(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const readingAdviceFinal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await session.readingAdviceFinal(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export {
    initSession,
    promptLLM,
    readingElement,
    readingUnion,
    readingMixElements,
    readingMixUnion,
    readingAdvice,
    readingAdviceComplete,
    readingAdviceFinal
};
