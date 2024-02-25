import { Request, Response } from 'express';
import RestaurantLoginModel from '../models/RestaurantLoginModel';
//import { body, validationResult } from 'express-validator';
//import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class RestaurantLoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const { status, restaurant } = await RestaurantLoginModel.authenticate(email, password);
      if (status === 'OK') {
        // Geração do token de autenticação
        const token = jwt.sign({ restaurantId: restaurant.id }, 'chave_secreta_token', { expiresIn: '18h' });

        res.status(202).json({ message: 'Login bem-sucedido', header: token });
      }
    } catch (error: any) {
      res.status(401).json({ error: 'Login falhou' });
    }
  }

  static async verifyToken(req: Request, res: Response, next: Function) {
    const authToken = req.body.header;
    if (!authToken) {
      return res.status(401).json({ error: 'Token de autorização não fornecido' });
    }

    try {
      const token = authToken.split(' ')[1]; // Excluindo o prefixo 'Bearer' do token
      const decodedToken: any = jwt.verify(token, 'chave_secreta_token');
      //req.userId = decodedToken.clientId;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token de autorização inválido' });
    }
  }
}

export default RestaurantLoginController;
