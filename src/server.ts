import express from 'express';
import llmRoutes from './routes/llmRoutes';
import chalk from 'chalk';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/llm-api', llmRoutes);

app.listen(PORT, () => {
    console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
});
