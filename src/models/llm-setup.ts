import { fileURLToPath } from 'url';
import path from 'path';
import chalk from 'chalk';
import { getLlama, LlamaChatSession } from 'node-llama-cpp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelsFolderDirectory = path.join(__dirname, "../..", "models");

const llama = await getLlama();

const model = await llama.loadModel({
    // modelPath: path.join(modelsFolderDirectory, "Meta-Llama-3.1-8B-Instruct.Q4_K_M.gguf")
    modelPath: path.join(modelsFolderDirectory, "unsloth.Q4_K_M.gguf")
});
console.log(chalk.yellow("Model loaded."));


export const createSession = async () => {
    const context = await model.createContext();
    console.log(chalk.yellow("Context created."));
    
    return new LlamaChatSession({
        contextSequence: context.getSequence()
    });
};
