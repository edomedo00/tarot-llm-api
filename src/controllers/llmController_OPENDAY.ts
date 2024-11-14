import { Request, Response, NextFunction } from 'express';
import { initializeModel, createSession } from '../models/llm-setup';
import chalk from 'chalk';

let session: any;
let initialChatHistory: any;

const startReadingOpendayES = async (req: Request, res: Response) => {
    if (!session) {
        session = await createSession();
        initialChatHistory = session.getChatHistory();
    } else {
        initialChatHistory = session.getChatHistory();
    }

    console.log(chalk.yellow("Reading started."));
    console.log(chalk.blue("LANG: ", 'ES'));

    res.status(200).json({ message: "Reading request received." });
};

const reading3cardsES = async (req: Request, res: Response, next: NextFunction): Promise<void> => {    
    const {cards} = req.body;

    console.log('Cards: ');
    console.log(cards);

    if (!session) {
        res.status(400).json({ error: "Session not initialized." });
        return;
    }


    const prompt = `
        Dadas las siguientes 3 cartas del tarot, quiero que me des una lectura acerca del presente de mi vida. Trata de mezclar los significados de todas las cartas entre sí. Quiero un texto que sea consiso y que deje espacio para la interpretación personal y la reflexión. No excedas las 250 palabras. No incluyas palabras de introducción. Incluye únicamente el texto sin formato.


        ### Carta 1:
        ${cards[0]}

        ### Carta 2:
        ${cards[1]}

        ### Carta 3:
        ${cards[2]}


        ### Lectura generada:
    `;

    try {
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out after 120 seconds")), 120000)
        );
    
        const result = await Promise.race([session.prompt(prompt), timeoutPromise]);
    
        session.setChatHistory(initialChatHistory);
        console.log(chalk.yellow("Reading finished."));
    
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error && error.message === "Request timed out after 120 seconds") {
            console.log(chalk.red("Request timed out."));
            initializeModel(true);
            res.status(400).json({ error: "Request timed out" });
        } else {
            next(error); 
        }
    }
    
};

export {
    startReadingOpendayES,
    reading3cardsES
};