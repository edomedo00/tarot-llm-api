import { fileURLToPath } from 'url';
import path from 'path';
import chalk from 'chalk';
import { getLlama, LlamaChatSession, LlamaModel } from 'node-llama-cpp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelsFolderDirectory = path.join(__dirname, "../..", "models");
let model: LlamaModel;

export const initializeModel = async (reaload: boolean) => {
    const llama = await getLlama();
    
    model = await llama.loadModel({
        modelPath: path.join(modelsFolderDirectory, "Meta-Llama-3.1-8B-Instruct.Q4_K_M.gguf")
        // modelPath: path.join(modelsFolderDirectory, "unsloth.Q4_K_M.gguf")
    });

    if (reaload) {
        console.log(chalk.bgGreen("Model reloaded."));
    } else {
        console.log(chalk.bgBlue("Model loaded."));
    }
    return model;
};

export const createSession = async () => {
    const context = await model.createContext();
    
    return new LlamaChatSession({
        contextSequence: context.getSequence()
    });
};


initializeModel(false);