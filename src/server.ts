import express from 'express';
import llmRoutes from "./routes/llmRoutes.js";
import chalk from 'chalk';
import { errorHandler } from "./middleware/errorMiddleware.js"; 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/llm-api', llmRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
});


// In case the port is being occupied for some reason

// Open Windows Terminal
// Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
// Stop-Process -Id PID -Force