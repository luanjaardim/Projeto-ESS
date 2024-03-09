import { Request, Response } from 'express';
import RestaurantLoginModel from '../models/RestaurantLoginModel';
//import { body, validationResult } from 'express-validator';
//import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RestaurantModel from '../models/RestaurantModel';
import { stringify } from 'querystring';

class RecoverPasswordController {

  static async recoverPassword(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const restaurant = await RestaurantLoginModel.getByEmail(email);  

     //await RestaurantLoginModel.setCodeByEmail(email) 
      //TODO: use email service

      res.status(202).json({ error: '' });
    } catch(e) {
      res.status(401).json({ error: 'NotFoundError' });
    }
  }


//   static async recoverPasswordCode(req: Request, res: Response) {
//     const { email, code } = req.body;

//     try {
//       await RestaurantLoginModel.verifyCode(email);   
//       return res.status(201).json({ message: 'Sucessufull login' });
//       //await RestaurantLoginModel.setCodeByEmail(email) 
//     } catch(e) {
//       res.status(401).json({ error: '' });
//     }
//   }
  
  // public async recoverPasswordCode(email: string, code: string): Promise<void> {
  //   try {
  //     const user = await RestaurantLoginModel.getByEmail(email);

  //     if(user.code != code) {
  //       throw new BadRequestError({
  //         msg: 'Incorrect recovery code!',
  //         msgCode: AuthenticationServiceMessageCode.incorrect_recovery_code,
  //       });
  //     }
    
  //     user.code = ''
  //     await this.userService.updateUserById(user.id, user);

  //   } catch(e) {
  //     throw e;
  //   }
  // }

  // public async resetPassword(email: string, password: string): Promise<void> {
  //   try {
  //     if (!(/\d/.test(password) &&
  //         /[a-zA-Z]/.test(password)) &&
  //         password.length != 8) {
  //       throw new BadRequestError({ msg: 'Invalid password format!',
  //                                   msgCode: AuthenticationServiceMessageCode.
  //                                             password_invalid_format})
  //     }

  //     const restaurant = await RestaurantLoginModel.getByEmail(email)
  //     user.password = password
  //     const updatedUser = await this.userRepository.updateUserById(user);
  //   } catch (e) {
  //     throw e;
  //   }
}

export default RecoverPasswordController;


