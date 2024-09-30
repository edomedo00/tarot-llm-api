import { Request, Response, NextFunction } from 'express';
import { createSession } from '../models/llm-setup';

let session: any;

export const initSession = async (req: Request, res: Response) => {
    session = await createSession();
    res.status(200).json({ message: "LLM session initialized." });
};

export const promptLLM = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
