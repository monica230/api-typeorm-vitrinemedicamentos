import { Router, Response, Request } from 'express';
import { AppDataSource } from '../database/data-source';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRoutes = Router();

userRoutes.get('/users', (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository('User');

    userRepository
        .find()
        .then(users => {
            res.status(200).json(users);
        })

        .catch(error => {
            res.status(500).json({ message: 'Erro ao buscar usuários' });
        });
});

userRoutes.post('/users', async (req: Request, res: Response) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            res.status(400).json({ message: 'Email e senha são obrigatórios' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        const userRepository = AppDataSource.getRepository('User');
        const user = userRepository.create({
            nome,
            email,
            senha: hashedPassword,
        });

        await userRepository.save(user);

        res.status(201).json({ user, message: 'Usuario criado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuario' });
    }
});

userRoutes.post('/login', async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
    }
    const userRepository = AppDataSource.getRepository('User');

    const user = await userRepository.findOne({
        where: {
            email: email,
        },
    });

    if (!user) {
        res.status(404).json({ message: 'Usuário ou senha não encontrado' });
    }
    const isValidPassword = await bcrypt.compare(senha, user?.senha);

    if (!isValidPassword) {
        res.status(401).json({ message: 'Usuário ou senha não encontrado' });
    }
    

    const token = jwt.sign(
        {
            id: user?.id,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '1d',
            algorithm: 'HS256',
        },
    );
    res.status(200).json({
        id: user?.id,
        nome: user?.nome,
        email: user?.email,
        token: token,
    });
});

export default userRoutes;

/*Implemente as rotas:

POST /users para cadastrar usuários.

A senha deve ser salva como hash (use bcrypt ou similar).

POST /login para autenticar um usuário.

Verifique o email e a senha.

Retorne um token válido caso os dados sejam corretos.*/
