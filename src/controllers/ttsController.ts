import * as textToSpeech from '@google-cloud/text-to-speech';
import { Request, Response } from 'express';
import chalk from 'chalk';

const synthesizeSpeech = async (text: string): Promise<Buffer> => {
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

    return Buffer.from(response.audioContent);
};

const synthesizeReading = async (req: Request, res: Response): Promise<void> => {
    const { reading } = req.body;

    if (!reading || typeof reading !== 'string') {
        res.status(400).json({ error: 'Invalid or missing "reading" in request body.' });
        return;
    }

    try {
        const audioContent = await synthesizeSpeech(reading);

        res.setHeader('Content-Type', 'audio/mpeg');

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        res.setHeader('Content-Disposition', `attachment; filename="output-${timestamp}.mp3"`);
        console.log(chalk.white('Speech synthesized successfully.'));
        res.send(audioContent);
    } catch (error) {
        console.error('Error synthesizing speech:', error);
        res.status(500).json({ error: 'Failed to synthesize speech.' });
    }
};

export { synthesizeReading };



