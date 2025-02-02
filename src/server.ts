import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './database/data-source';
import userRoutes from './routes/user.routes';

const app = express();

dotenv.config();

const porta = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.initialize()
    .then(() => {
    
        console.log('Conexão com o banco de dados realizada com sucesso!');

        app.use('/', userRoutes);
        
        app.listen(3000, () => {
            console.log(`\nServidor rodando na porta ${porta}`);
        });
    })
    .catch(error =>
        console.log('\nErro ao conectar com o banco de dados: ', error),
    );
