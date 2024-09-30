import {fileURLToPath} from "url";
import path from "path";
import chalk from "chalk";
import {getLlama, LlamaChatSession} from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelsFolderDirectory = path.join(__dirname, "..", "models");

const llama = await getLlama();

console.log(chalk.yellow("Loading model..."));
const model = await llama.loadModel({
    modelPath: path.join(modelsFolderDirectory, "Meta-Llama-3.1-8B-Instruct.Q4_K_M.gguf")
});

const contextOptions = {
    sequences: 1, // Default is 1, you can increase it if needed
    contextSize: { min: 512, max: 1024 }, // Adjust this range based on your VRAM availability
    batchSize: 256, // Set a custom batch size
    flashAttention: true, // Enable flash attention if supported
    threads: {
      ideal: 12,
      min: 8
    }, // Specify the number of threads to use
    lora: {
      adapters: [
        {
          filePath: path.join(modelsFolderDirectory, "/adapters/lora_model_llama3.1_8b_test/adapter_model2.bin"),
          scale: 1.0
        }
      ],
      onLoadProgress: (progress : number) => {
        console.log(`LoRA Loading Progress: ${(progress * 100).toFixed(2)}%`);
      }
    },
    failedCreationRemedy: {
      retries: 1, // Retry 3 times in case of failed context creation
      autoContextSizeShrink: 0.2 // Shrink context size by 10% on each retry
    },
    performanceTracking: true // Enable performance tracking
  };
  

console.log(chalk.yellow("Creating context..."));
const context = await model.createContext();
// const context = await model.createContext(contextOptions);

const session = new LlamaChatSession({
    contextSequence: context.getSequence()
});
console.log();


const q1 = "What does the fool in the context of tarot say about my love life?";
console.log(chalk.blue("User: ") + q1);

const a1 = await session.prompt(q1);
console.log(chalk.yellow("Consolidated AI answer: ") + a1);
console.log();
