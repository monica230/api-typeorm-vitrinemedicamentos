import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './database/data-source';
import userRoutes from './routes/user.routes';

const app = express();

dotenv.config();

const porta =Number (process.env.PORTA) ||3000;

app.use(express.json());



AppDataSource.initialize()
.then(()=>{

console.log('Conexão com o banco de dados realizada com sucesso!');

app.use("/use", userRoutes);

    app.listen(porta, () => {
        console.log(`Servidor rodando na porta ${porta}`);
    });
})
.catch((error) => (
    console.log(
        'Error ao conectar no banco de dados:',error)
    ))


    