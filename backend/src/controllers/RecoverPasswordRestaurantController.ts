import { Request, Response } from 'express';
import RecoverPasswordModel from '../models/RecoverPasswordRestaurantModel';
import { Prisma } from '@prisma/client';


class RecoverPasswordRestaurantController {

  static async recoverPassword(req: Request, res: Response) {
    const { email } = req.body;

    try {
      await RecoverPasswordModel.getByEmail(email);  
      await RecoverPasswordModel.setCodeByEmail(email);
      res.status(202).json({message : 'Code sended to email. '});
    } catch(e) {
      res.status(401).json({ error: 'NotFoundError' });
    }
  }

  static async recoverPasswordCode(req: Request, res: Response) {
    const { email, code } = req.body;
    try {
    await RecoverPasswordModel.verifyCode(email, code);   
      return res.status(201).json({});
    } catch(e) {
      res.status(401).json({ error: 'AuthenticationError' });
    }
  }

  static async updatePassword(req: Request, res: Response) {
    const { email, password } = req.body;
    try {

      await RecoverPasswordModel.updatePasswordByEmail(email, password);   
      return res.status(201).json({});
    } catch(e) {
      res.status(401).json({ error: 'AuthenticationError' });
    }
  }
}

export default RecoverPasswordRestaurantController;

