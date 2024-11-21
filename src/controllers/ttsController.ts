import * as textToSpeech from '@google-cloud/text-to-speech';
import { Request, Response } from 'express';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const synthesizeSpeech = async (text: string): Promise<string> => {
    const client = new textToSpeech.TextToSpeechClient();

    const request: textToSpeech.protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
        input: { text },
        voice: {
            languageCode: 'es-US',
            name: 'es-US-Standard-B',
            ssmlGender: 'MALE',
        },
        audioConfig: {
            audioEncoding: 'MP3',
        },
    };

    const [response] = await client.synthesizeSpeech(request);

    if (!response.audioContent) {
        throw new Error('No audio content received.');
    }

    const tempDir = path.join(__dirname, '..', '..', 'temp');
    const filePath = path.join(tempDir, 'tempReading.mp3');

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    fs.writeFileSync(filePath, response.audioContent, 'binary');
    return filePath;
};

const synthesizeReading = async (req: Request, res: Response): Promise<void> => {
    const { reading } = req.body;

    if (!reading || typeof reading !== 'string') {
        res.status(400).json({ error: 'Invalid or missing "reading" in request body.' });
        return;
    }

    try {
        const filePath = await synthesizeSpeech(reading);
        console.log(chalk.green(`Speech synthesized successfully: ${filePath}`));

        res.status(200).json({ message: 'Successful synthesis', path: filePath });
    } catch (error) {
        console.error('Error synthesizing speech:', error);
        res.status(500).json({ error: 'Failed to synthesize speech.' });
    }
};

const getReadingSpeech = async (req: Request, res: Response): Promise<void> => {
    const tempDir = path.join(__dirname, '..', '..', 'temp');
    const filePath = path.join(tempDir, 'tempReading.mp3');
    if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: 'File not found. Please synthesize the speech first.' });
        return;
    }
    
    try {
        const fileBuffer = fs.readFileSync(filePath);
        res.end(fileBuffer);
    } catch (error) {
        console.error('Error serving the MP3 file:', error);
        res.status(500).json({ error: 'Failed to serve the audio file.' });
    }
};

export {
    synthesizeReading,
    getReadingSpeech,
};
