import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const porta = process.env.PORTA ||3000;

app.listen(3000, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
