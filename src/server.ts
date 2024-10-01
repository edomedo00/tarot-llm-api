import express from 'express';
import llmRoutes from './routes/llmRoutes';
import chalk from 'chalk';
import { errorHandler } from './middleware/errorMiddleware'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/llm-api', llmRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
});
